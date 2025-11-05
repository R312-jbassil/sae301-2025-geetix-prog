// backend/backend.mjs
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090/_/");

export function loadAuthFromCookie(cookieString) {
  if (cookieString) {
    pb.authStore.loadFromCookie(cookieString);
  }
  return pb.authStore.isValid;
}

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

export async function getAllLunettes(authCookie) {
  if (authCookie) {
    pb.authStore.loadFromCookie(authCookie);
  }

  if (!pb.authStore.isValid) {
    return { success: false, error: "Non authentifié", lunettes: [] };
  }

  try {
    const allLunettes = await pb.collection("Lunettes").getFullList({
      sort: "-created",
      expand: "Materiau",
    });

    const lunettes = allLunettes.filter(
      (l) => l.user === pb.authStore.model.id
    );
    return { success: true, lunettes };
  } catch (error) {
    return { success: false, error: error.message, lunettes: [] };
  }
}

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
