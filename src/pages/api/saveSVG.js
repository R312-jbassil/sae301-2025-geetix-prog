import PocketBase from "pocketbase";

export const POST = async ({ request }) => {
  try {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const { svg, config } = await request.json();

    // Auth avec la collection "users"
    await pb
      .collection("users")
      .authWithPassword("mathis@gmail.com", "pocketbase");

    const user = pb.authStore.model;

    // Sauvegarde dans la collection "Lunettes"
    const record = await pb.collection("Lunettes").create({
      nom_modele: `Lunette_${Date.now()}`,
      date_crea: new Date().toISOString(),
      code_svg: svg,
      largeur_pont: config.largeurPont,
      taille_verres: config.tailleVerres.toString(),
      couleur_monture: config.materiauMonture,
      couleur_branches: config.couleurBranches,
      id_user: user.id,
    });

    return new Response(JSON.stringify({ success: true, id: record.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
