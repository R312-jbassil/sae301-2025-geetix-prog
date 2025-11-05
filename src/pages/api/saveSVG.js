import PocketBase from "pocketbase";

export const POST = async ({ request, cookies }) => {
  try {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const { svg, config, modelName } = await request.json();

    const authCookie = cookies.get("pb_auth");
    if (!authCookie) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const authData = JSON.parse(decodeURIComponent(authCookie.value));
    pb.authStore.save(authData.token, authData.model);

    const userId = pb.authStore.model.id;

    const record = await pb.collection("Lunettes").create({
      nom_modele: modelName,
      date_crea: new Date().toISOString(),
      code_svg: svg,
      largeur_pont: config.largeurPont,
      taille_verres: config.tailleVerres.toString(),
      couleur_monture: config.materiauMonture,
      couleur_branches: config.couleurBranches,
      user: userId, // Changé de id_user à user
    });

    return new Response(JSON.stringify({ success: true, id: record.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur complète:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.response?.data,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
