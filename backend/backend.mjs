// backend/backend.mjs
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

// Auto-refresh de l'authentification
pb.authStore.onChange(() => {
  if (typeof document !== "undefined") {
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
  }
});

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
  // Charger l'auth
  if (authCookie) {
    pb.authStore.loadFromCookie(authCookie);
  }

  if (!pb.authStore.isValid) {
    return { success: false, error: "Non authentifié" };
  }

  try {
    // Données de la lunette
    const lunetteData = {
      nom_modele: data.nom_modele,
      code_svg: data.code_svg,
      largeur_pont: data.largeur_pont,
      taille_verres: data.taille_verres,
      couleur_monture: data.couleur_monture,
      couleur_branches: data.couleur_branches,
      epaisseur_trait: data.epaisseur_trait || 0.5,
      id_user: pb.authStore.model.id,
      date_crea: new Date().toISOString(),
    };

    // Créer la lunette
    let lunetteRecord = await pb.collection("Lunette").create(lunetteData);

    // Si un matériau est sélectionné, créer la relation
    if (data.id_materiau) {
      await pb.collection("Composer").create({
        id_lunette: lunetteRecord.id,
        id_materiau: data.id_materiau,
      });
    }

    return { success: true, lunette: lunetteRecord };
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
    // Vérifier que la lunette appartient à l'utilisateur
    const lunette = await pb.collection("Lunette").getOne(id);

    if (lunette.id_user !== pb.authStore.model.id) {
      return { success: false, error: "Non autorisé" };
    }

    // Supprimer les relations dans Composer
    try {
      const composerRecords = await pb.collection("Composer").getFullList({
        filter: `id_lunette = "${id}"`,
      });

      for (const record of composerRecords) {
        await pb.collection("Composer").delete(record.id);
      }
    } catch (err) {
      console.log("Aucune relation Composer à supprimer");
    }

    // Supprimer la lunette
    await pb.collection("Lunette").delete(id);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Récupère toutes les lunettes d'un utilisateur
 */
export async function getUserLunettes(authCookie) {
  if (authCookie) {
    pb.authStore.loadFromCookie(authCookie);
  }

  if (!pb.authStore.isValid) {
    return { success: false, error: "Non authentifié", lunettes: [] };
  }

  try {
    const lunettes = await pb.collection("Lunette").getFullList({
      filter: `id_user = "${pb.authStore.model.id}"`,
      sort: "-date_crea",
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
    const lunette = await pb.collection("Lunette").getOne(id);

    // Vérifier que la lunette appartient à l'utilisateur
    if (lunette.id_user !== pb.authStore.model.id) {
      return { success: false, error: "Non autorisé" };
    }

    return { success: true, lunette };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export default pb;
