import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export async function POST({ request, cookies }) {
  try {
    const { svg, config } = await request.json();

    // Récupérer le token d'auth depuis les cookies
    const authCookie = cookies.get("pb_auth");
    if (authCookie) {
      pb.authStore.loadFromCookie(authCookie.value);
    }

    const user = pb.authStore.model;

    if (!user) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const record = await pb.collection("Lunette").create({
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
    console.error("Erreur sauvegarde:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
