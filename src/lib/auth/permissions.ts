import { getSessionCookie } from "@/lib/auth/cookies";
import { userRepository } from "@/server/repositories/user.repository";
import { UnauthorizedError, ForbiddenError } from "@/lib/errors";
import type { Role, User, Student, Teacher } from "@prisma/client";

export type SessionUser = User & {
  student: Student | null;
  teacher: Teacher | null;
};

export async function getCurrentUser(): Promise<SessionUser | null> {
  const token = await getSessionCookie();
  if (!token) return null;

  const session = await userRepository.findSessionByToken(token);
  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await userRepository.deleteSession(token);
    return null;
  }

  return session.user;
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new UnauthorizedError("You must be logged in to access this resource");
  }
  if (user.status === "SUSPENDED" || user.status === "INACTIVE") {
    throw new ForbiddenError("Your account is not active");
  }
  return user;
}

export async function requireRole(allowedRoles: Role | Role[]): Promise<SessionUser> {
  const user = await requireAuth();
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(user.role)) {
    throw new ForbiddenError(
      `Access denied. Requires one of: ${roles.join(", ")}`
    );
  }

  return user;
}

export async function requireAdmin(): Promise<SessionUser> {
  return requireRole("ADMIN");
}

export async function requireTeacher(): Promise<SessionUser> {
  return requireRole("TEACHER");
}

export async function requireStudent(): Promise<SessionUser> {
  return requireRole("STUDENT");
}
