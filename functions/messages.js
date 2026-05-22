export async function onRequestGet(context) {
  const bucket = context.env.PSELL_MESSAGES;
  const listed = await bucket.list();

  const messages = await Promise.all(
    listed.objects.map(async (obj) => {
      const item = await bucket.get(obj.key);
      const data = await item.json();
      return { _key: obj.key, ...data };
    })
  );

  return Response.json(messages);
}
