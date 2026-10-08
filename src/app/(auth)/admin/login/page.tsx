import { RoleLoginPage } from "@/components/auth/RoleLoginPage";

export const metadata = {
  title: "Admin Sign In | Al-Qalam Global Academy",
  description: "Sign in to access the Al-Qalam Global Academy Administrative Control Center.",
};

export default function AdminLoginPage() {
  return <RoleLoginPage role="ADMIN" />;
}
