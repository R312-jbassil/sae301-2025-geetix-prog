import PocketBase from "pocketbase";

export const POST = async ({ request, cookies }) => {
  try {
    const data = await request.json();
    const { nom_modele, code_svg, couleur_monture, couleur_branches } = data;

    const pb = new PocketBase("http://127.0.0.1:8090");
    const authCookie = cookies.get("pb_auth");

    if (!authCookie) {
      return new Response(JSON.stringify({ error: "Non authentifié" }), {
        status: 401,
      });
    }

    const authData = JSON.parse(decodeURIComponent(authCookie.value));
    pb.authStore.save(authData.token, authData.model);

    // Sauvegarde dans Config_IA (pour l'IA)
    if (!data.config) {
      const record = await pb.collection("Config_IA").create({
        user: pb.authStore.model.id,
        prompt: nom_modele || "SVG généré par IA",
        response: code_svg,
        svg: code_svg,
      });

      return new Response(JSON.stringify({ success: true, record }), {
        status: 200,
      });
    }

    // Sauvegarde dans Lunettes (pour le configurateur)
    let svgFinal = data.svg
      .replace(/MONTURE_COLOR/g, data.config.materiauMonture)
      .replace(/BRANCHES_COLOR/g, data.config.couleurBranches)
      .replace(/PONT_OFFSET/g, ((data.config.largeurPont - 18) * 2).toString())
      .replace(/VERRES_SCALE/g, data.config.tailleVerres.toString())
      .replace(
        /VERRES_TRANSLATE/g,
        (-(data.config.tailleVerres - 1.1) * 100).toString()
      );

    const record = await pb.collection("Lunettes").create({
      user: pb.authStore.model.id,
      nom_modele: data.modelName,
      code_svg: svgFinal,
      couleur_monture: data.config.materiauMonture,
      couleur_branches: data.config.couleurBranches,
      largeur_pont: data.config.largeurPont,
      taille_verres: data.config.tailleVerres,
      materiau: data.config.materiauId,
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
