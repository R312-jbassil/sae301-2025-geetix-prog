export const POST = async ({ cookies }) => {
  cookies.delete("pb_auth", { path: "/" });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
