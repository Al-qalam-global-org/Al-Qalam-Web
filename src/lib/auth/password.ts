import { hash, verify } from "@node-rs/argon2";

const ARGON2_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPassword(plainPassword: string): Promise<string> {
  return await hash(plainPassword, ARGON2_OPTIONS);
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await verify(hashedPassword, plainPassword);
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}
