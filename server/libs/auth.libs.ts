import bcrypt from "bcrypt";

export class AuthService {
  hashPassword(password: string) {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  }

  isPasswordMatch(base: string, compare: string): boolean {
    let res: boolean = false;

    bcrypt.compare(compare, base, function (err, result) {
      if (err) {
        throw new Error(err.message);
      }
      res = result;
    });

    return res;
  }
}
