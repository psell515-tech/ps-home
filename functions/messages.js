export async function onRequestGet(context) {
  try {
    // List all objects in the R2 bucket
    const list = await context.env.MESSAGES.list();

    const messages = [];

    // Fetch each message file
    for (const item of list.objects) {
      const obj = await context.env.MESSAGES.get(item.key);
      if (!obj) continue;
      const json = await obj.json();
      messages.push(json);
    }

    // Sort newest → oldest
    messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return new Response(JSON.stringify(messages), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error(err);
    return new Response("Error reading messages", { status: 500 });
  }
}
