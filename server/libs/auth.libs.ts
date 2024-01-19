import bcrypt from "bcrypt";

export class AuthService {
  static hashPassword(password: string) {
    let res = "";

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          throw new Error(err.message);
        }
        res = hash;
      });
    });

    return res;
  }
  static isPasswordMatch(base: string, compare: string): boolean {
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
