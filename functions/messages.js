export async function onRequestGet(context) {
  try {
    const bucket = context.env.PSELL_MESSAGES;

    if (!bucket) {
      return Response.json({ error: "R2 binding missing" }, { status: 500 });
    }

    const listed = await bucket.list();

    const messages = await Promise.all(
      listed.objects.map(async (obj) => {
        const item = await bucket.get(obj.key);
        if (!item) return { _key: obj.key, error: "not found" };
        const data = await item.json();
        return { _key: obj.key, ...data };
      })
    );

    return Response.json(messages);
  } catch (err) {
    return Response.json({ error: err.message, stack: err.stack }, { status: 500 });
  }
}
