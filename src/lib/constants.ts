export const APP_NAME = "Al-Qalam Global Academy";
export const APP_TAGLINE = "Learn Islam. Live with Purpose.";
export const APP_DESCRIPTION =
  "Structured online Islamic education for children, teenagers and adults — with qualified teachers, flexible learning and a clear path from knowledge to practice.";

export const COOKIE_SESSION_NAME = "alqalam_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

export const ROLES = {
  ADMIN: "ADMIN",
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PENDING: "PENDING",
  SUSPENDED: "SUSPENDED",
} as const;

export const CLASS_STATUS = {
  SCHEDULED: "SCHEDULED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  RESCHEDULED: "RESCHEDULED",
} as const;

export const CLASS_TYPE = {
  ONE_TO_ONE: "ONE_TO_ONE",
  GROUP: "GROUP",
} as const;

export const MEETING_PLATFORM = {
  ZOOM: "ZOOM",
  GOOGLE_MEET: "GOOGLE_MEET",
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
  LATE: "LATE",
} as const;

export const ASSIGNMENT_SUBMISSION_STATUS = {
  PENDING: "PENDING",
  SUBMITTED: "SUBMITTED",
  REVIEWED: "REVIEWED",
} as const;

export const MATERIAL_TYPE = {
  PDF: "PDF",
  IMAGE: "IMAGE",
  DOCUMENT: "DOCUMENT",
  LINK: "LINK",
} as const;

export const NOTE_VISIBILITY = {
  STUDENT_VISIBLE: "STUDENT_VISIBLE",
  INTERNAL: "INTERNAL",
} as const;
