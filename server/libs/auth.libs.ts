import bcrypt from "bcrypt";

export class AuthService {
  hashPassword(password: string) {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  }

  async isPasswordMatch(plainText: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hash);
  }
}
