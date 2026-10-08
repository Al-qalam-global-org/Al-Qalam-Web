import crypto from "crypto";
import { userRepository } from "@/server/repositories/user.repository";
import { auditRepository } from "@/server/repositories/audit.repository";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { setSessionCookie, clearSessionCookie } from "@/lib/auth/cookies";
import { brevoEmailService } from "@/lib/brevo";
import {
  UnauthorizedError,
  NotFoundError,
  ValidationError,
} from "@/lib/errors";
import { env } from "@/lib/env";
import { SESSION_MAX_AGE } from "@/lib/constants";

export class AuthService {
  async login(email: string, plainPassword: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    if (user.status === "SUSPENDED" || user.status === "INACTIVE") {
      throw new UnauthorizedError("Account is inactive or suspended");
    }

    const isMatch = await verifyPassword(plainPassword, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Generate secure random session token
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000);

    await userRepository.createSession(user.id, sessionToken, expiresAt);
    await userRepository.updateLastLogin(user.id);
    await setSessionCookie(sessionToken, expiresAt);

    await auditRepository.log({
      userId: user.id,
      action: "USER_LOGIN",
      entity: "User",
      entityId: user.id,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        student: user.student,
        teacher: user.teacher,
      },
    };
  }

  async logout(sessionToken?: string) {
    if (sessionToken) {
      await userRepository.deleteSession(sessionToken);
    }
    await clearSessionCookie();
  }

  async requestPasswordReset(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      // Don't disclose user non-existence to prevent account enumeration
      return { success: true };
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await userRepository.createPasswordResetToken(user.id, tokenHash, expiresAt);

    const resetLink = `${env.APP_URL}/reset-password?token=${rawToken}`;
    await brevoEmailService.sendPasswordResetEmail(user.email, resetLink);

    return { success: true };
  }

  async resetPassword(rawToken: string, newPassword: string) {
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const resetRecord = await userRepository.findValidResetToken(tokenHash);

    if (!resetRecord) {
      throw new ValidationError("Password reset token is invalid or has expired");
    }

    const newHash = await hashPassword(newPassword);
    await userRepository.updatePassword(resetRecord.userId, newHash);
    await userRepository.markResetTokenUsed(resetRecord.id);

    await auditRepository.log({
      userId: resetRecord.userId,
      action: "PASSWORD_RESET_COMPLETED",
      entity: "User",
      entityId: resetRecord.userId,
    });

    return { success: true };
  }

  async changePassword(userId: string, currentPass: string, newPass: string) {
    const user = await userRepository.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    const valid = await verifyPassword(currentPass, user.passwordHash);
    if (!valid) throw new ValidationError("Current password does not match");

    const newHash = await hashPassword(newPass);
    await userRepository.updatePassword(userId, newHash);

    return { success: true };
  }
}

export const authService = new AuthService();
