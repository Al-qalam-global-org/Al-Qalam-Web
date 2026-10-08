import { RoleLoginPage } from "@/components/auth/RoleLoginPage";

export const metadata = {
  title: "Teacher Sign In | Al-Qalam Global Academy",
  description: "Sign in to access the Al-Qalam Ustadh & Teacher portal.",
};

export default function TeacherLoginPage() {
  return <RoleLoginPage role="TEACHER" />;
}
