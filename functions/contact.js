export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const { name, email, message } = data;

    const timestamp = new Date().toISOString();
    const id = crypto.randomUUID();

    const record = {
      id,
      name,
      email,
      message,
      created_at: timestamp
    };

    await context.env.MESSAGES.put(
      `msg-${timestamp}-${id}.json`,
      JSON.stringify(record),
      { httpMetadata: { contentType: "application/json" } }
    );

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ ok: false, error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
