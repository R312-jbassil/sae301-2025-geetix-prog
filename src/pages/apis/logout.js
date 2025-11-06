export const POST = async ({ cookies }) => {
  cookies.delete("pb_auth", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    httpOnly: false,
    secure: true,
    sameSite: "lax",
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
