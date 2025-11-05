// backend/backend.mjs
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

/**
 * Vérifie si l'utilisateur est authentifié depuis un cookie
 */
export function loadAuthFromCookie(cookieString) {
  if (cookieString) {
    pb.authStore.loadFromCookie(cookieString);
  }
  return pb.authStore.isValid;
}

/**
 * Récupère tous les matériaux
 */
export async function getMaterials() {
  try {
    const materials = await pb.collection("Materiau").getFullList({
      sort: "libelle",
    });
    return { success: true, materials };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Sauvegarde une lunette
 */
export async function saveLunette(data, authCookie) {
  if (authCookie) {
    pb.authStore.loadFromCookie(authCookie);
  }

  if (!pb.authStore.isValid) {
    return { success: false, error: "Non authentifié" };
  }

  try {
    const lunetteData = {
      nom_modele: data.nom_modele,
      code_svg: data.code_svg,
      largeur_pont: data.largeur_pont,
      taille_verres: data.taille_verres,
      couleur_monture: data.couleur_monture,
      couleur_branches: data.couleur_branches,
      materiau: data.materiau_id || null,
      user: pb.authStore.model.id,
      date_crea: new Date().toISOString(),
    };

    const lunetteRecord = await pb.collection("Lunettes").create(lunetteData);
    return { success: true, lunette: lunetteRecord };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Récupère toutes les lunettes de l'utilisateur
 */
export async function getAllLunettes(authCookie) {
  if (authCookie) {
    pb.authStore.loadFromCookie(authCookie);
  }

  if (!pb.authStore.isValid) {
    return { success: false, error: "Non authentifié", lunettes: [] };
  }

  try {
    const lunettes = await pb.collection("Lunettes").getFullList({
      filter: `user = "${pb.authStore.model.id}"`,
      sort: "-date_crea",
      expand: "materiau",
    });

    return { success: true, lunettes };
  } catch (error) {
    return { success: false, error: error.message, lunettes: [] };
  }
}

/**
 * Récupère une lunette par son ID
 */
export async function getLunetteById(id, authCookie) {
  if (authCookie) {
    pb.authStore.loadFromCookie(authCookie);
  }

  if (!pb.authStore.isValid) {
    return { success: false, error: "Non authentifié" };
  }

  try {
    const lunette = await pb.collection("Lunettes").getOne(id, {
      expand: "materiau",
    });

    if (lunette.user !== pb.authStore.model.id) {
      return { success: false, error: "Non autorisé" };
    }

    return { success: true, lunette };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Supprime une lunette
 */
export async function deleteLunette(id, authCookie) {
  if (authCookie) {
    pb.authStore.loadFromCookie(authCookie);
  }

  if (!pb.authStore.isValid) {
    return { success: false, error: "Non authentifié" };
  }

  try {
    const lunette = await pb.collection("Lunettes").getOne(id);

    if (lunette.user !== pb.authStore.model.id) {
      return { success: false, error: "Non autorisé" };
    }

    await pb.collection("Lunettes").delete(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export default pb;
