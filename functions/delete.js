export async function onRequestPost(context) {
  try {
    const { key } = await context.request.json();

    if (!key) {
      return new Response("Missing key", { status: 400 });
    }

    await context.env.MESSAGES.delete(key);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error(err);
    return new Response("Error deleting message", { status: 500 });
  }
}
