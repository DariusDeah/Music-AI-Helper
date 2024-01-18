import jwt from "jsonwebtoken";
export function signJWT(data: any) {
  return jwt.sign(
    {
      data,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
      issuer: "music-ai-server",
      audience: "musicai.com",
      subject: data["id"],
    }
  );
}

export function verifyJWT(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
