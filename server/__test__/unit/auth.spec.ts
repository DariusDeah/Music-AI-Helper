import { AuthService } from "../../libs/auth.libs";

describe("When using auth lib", () => {
  const authService = new AuthService();
  const password = "password";

  it("should return a hashed string when .hashPassword() is called", () => {
    const hashedPassword = authService.hashPassword(password);

    expect(hashedPassword).not.toEqual(password);
  });

  it("should return true when isPasswordMatch() is called with matching password", async () => {
    const hashedPassword = authService.hashPassword(password);

    const result = await authService.isPasswordMatch(password, hashedPassword);

    expect(result).toBe(true);
  });

  it("should return false when isPasswordMatch() is called with non matching password", async () => {
    const invalidPassword = "fail";

    const hashedPassword = authService.hashPassword(invalidPassword);

    const result = await authService.isPasswordMatch(password, hashedPassword);

    expect(result).toBe(false);
  });
});
