export async function onRequestGet(context) {
  try {
    const list = await context.env.MESSAGES.list();
    const messages = [];

    for (const item of list.objects) {
      const obj = await context.env.MESSAGES.get(item.key);
      if (!obj) continue;

      // R2 returns a STRING, so parse it manually
      let json;
      try {
        json = JSON.parse(obj);
      } catch (err) {
        console.error("Bad JSON in object:", item.key);
        continue;
      }

      json._key = item.key;
      messages.push(json);
    }

    // newest first
    messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return new Response(JSON.stringify(messages), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error(err);
    return new Response("Error reading messages", { status: 500 });
  }
}
