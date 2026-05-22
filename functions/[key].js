export async function onRequestDelete(context) {
  const bucket = context.env.PSELL_MESSAGES;
  const key = context.params.key;
  await bucket.delete(key);
  return Response.json({ success: true });
}
