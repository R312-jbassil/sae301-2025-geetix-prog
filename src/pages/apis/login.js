import pb from "../../../utils/pb";

export const POST = async ({ request, cookies }) => {
  const { email, password } = await request.json();

  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    // Stocke le token dans un cookie sécurisé
    cookies.set(
      "pb_auth",
      JSON.stringify({
        token: pb.authStore.token,
        model: pb.authStore.model,
      }),
      {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 86400,
      }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }
};
