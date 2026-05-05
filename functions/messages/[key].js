export async function onRequestDelete(context) {
  try {
    const key = context.params.key;
    await context.env.MESSAGES.delete(key);

    return new Response("Deleted", { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response("Error deleting message", { status: 500 });
  }
}
