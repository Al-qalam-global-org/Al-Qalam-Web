import { RoleLoginPage } from "@/components/auth/RoleLoginPage";

export const metadata = {
  title: "Student Sign In | Al-Qalam Global Academy",
  description: "Sign in to access your Islamic courses, live classes and learner dashboard.",
};

export default function StudentLoginPage() {
  return <RoleLoginPage role="STUDENT" />;
}
