import PocketBase from "pocketbase";

export const POST = async ({ request, cookies }) => {
  try {
    const data = await request.json();
    const { svg, config, modelName } = data;

    const pb = new PocketBase("http://127.0.0.1:8090");
    const authCookie = cookies.get("pb_auth");

    if (!authCookie) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
      });
    }

    const authData = JSON.parse(decodeURIComponent(authCookie.value));
    pb.authStore.save(authData.token, authData.model);

    // Remplace les placeholders par les vraies couleurs
    let svgFinal = svg
      .replace(/MONTURE_COLOR/g, config.materiauMonture)
      .replace(/BRANCHES_COLOR/g, config.couleurBranches)
      .replace(/PONT_OFFSET/g, ((config.largeurPont - 18) * 2).toString())
      .replace(/VERRES_SCALE/g, config.tailleVerres.toString())
      .replace(/VERRES_TRANSLATE/g, (-(config.tailleVerres - 1.1) * 100).toString());

    const record = await pb.collection("Lunettes").create({
      user: pb.authStore.model.id,
      nom_modele: modelName,
      code_svg: svgFinal,
      couleur_monture: config.materiauMonture,
      couleur_branches: config.couleurBranches,
      largeur_pont: config.largeurPont,
      taille_verres: config.tailleVerres,
      materiau: config.materiauId,
    });

    return new Response(JSON.stringify({ success: true, record }), {
      status: 200,
    });
  } catch (error) {
    console.error("Erreur saveSVG:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
