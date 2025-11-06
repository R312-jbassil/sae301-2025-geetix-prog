import PocketBase from "pocketbase";

const pb = new PocketBase("https://sae301.mathis-guellati.fr");

export const onRequest = async (context, next) => {
  // Charger l'auth depuis le cookie
  const authCookie = context.cookies.get("pb_auth")?.value;

  if (authCookie) {
    try {
      const authData = JSON.parse(decodeURIComponent(authCookie));
      pb.authStore.save(authData.token, authData.model);

      if (pb.authStore.isValid) {
        context.locals.user = pb.authStore.model;
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  }

  // Protection des routes API
  if (context.url.pathname.startsWith("/api/")) {
    const allowedAPIs = ["/api/login", "/api/signup"];
    const isAllowed = allowedAPIs.includes(context.url.pathname);

    if (!context.locals.user && !isAllowed) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    return next();
  }

  // Redirection des pages non-auth
  const publicPages = ["/connexion", "/inscription", "/"];
  const isPublic = publicPages.includes(context.url.pathname);

  if (!context.locals.user && !isPublic) {
    return new Response(null, {
      status: 303,
      headers: { Location: "/connexion" },
    });
  }

  // Redirection si connecté et sur login
  if (context.locals.user && context.url.pathname === "/connexion") {
    return new Response(null, {
      status: 303,
      headers: { Location: "/mes-lunettes" },
    });
  }

  return next();
};
