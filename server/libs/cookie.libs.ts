import cookie from "cookie";

export function generateAuthCookie(authValue: string) {
  if (process.env.NODE_ENV !== "production") {
    return cookie.serialize("token", authValue, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 hour
      path: "/",
    });
  }

  return cookie.serialize("token", authValue, {
    maxAge: 60 * 60 * 24, // 1 hour
    path: "/",
    domain: "wwww.music-ai",
    sameSite: "none",
    secure: true,
  });
}
