export const POST = async ({ cookies, redirect }) => {
  cookies.delete("pb_auth", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return redirect("/connexion", 303);
};
