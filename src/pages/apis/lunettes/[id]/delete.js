import pb from "../../../../utils/pb";

export const DELETE = async ({ params, cookies }) => {
  try {
    const authCookie = cookies.get("pb_auth");

    if (!authCookie) {
      return new Response(JSON.stringify({ error: "Non auth" }), {
        status: 401,
      });
    }

    const authData = JSON.parse(decodeURIComponent(authCookie.value));
    pb.authStore.save(authData.token, authData.model);

    const userId = pb.authStore.model.id;

    // Vérifie que l'enregistrement appartient à l'utilisateur
    const lunette = await pb.collection("Lunettes").getOne(params.id);

    if (lunette.user !== userId) {
      return new Response(JSON.stringify({ error: "Non autorisé" }), {
        status: 403,
      });
    }

    // Supprime l'enregistrement
    await pb.collection("Lunettes").delete(params.id);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur delete:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
