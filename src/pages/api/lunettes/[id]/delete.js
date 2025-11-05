import PocketBase from "pocketbase";

export const DELETE = async ({ params, cookies }) => {
  try {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const authCookie = cookies.get("pb_auth");

    if (!authCookie) {
      return new Response(JSON.stringify({ error: "Non auth" }), {
        status: 401,
      });
    }

    const authData = JSON.parse(decodeURIComponent(authCookie.value));
    pb.authStore.save(authData.token, authData.model);

    // Supprime l'enregistrement PocketBase
    await pb.collection("Lunettes").delete(params.id);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur delete:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
