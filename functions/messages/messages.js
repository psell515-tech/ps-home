export async function onRequestGet(context) {
  try {
    const list = await context.env.MESSAGES.list();
    const messages = [];

    for (const item of list.objects) {
      const obj = await context.env.MESSAGES.get(item.key);
      if (!obj) continue;

      let json;
      try {
        json = JSON.parse(obj);   // <-- FIXED
      } catch {
        continue; // skip corrupted entries
      }

      json._key = item.key;
      messages.push(json);
    }

    messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return new Response(JSON.stringify(messages), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error(err);
    return new Response("Error reading messages", { status: 500 });
  }
}
