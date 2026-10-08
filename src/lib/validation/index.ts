import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const passwordResetConfirmSchema = z.object({
  token: z.string().min(10, "Invalid reset token"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export const createStudentSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().default("UTC"),
  grade: z.string().optional(),
  level: z.string().default("Beginner"),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  parentEmail: z.string().email().optional().or(z.literal("")),
  courseIds: z.array(z.string()).optional(),
  teacherId: z.string().optional(),
});

export const updateStudentSchema = createStudentSchema.partial();

export const createTeacherSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().default("UTC"),
  qualification: z.string().optional(),
  experienceYears: z.number().int().min(0).default(0),
  specialization: z.string().optional(),
  bio: z.string().optional(),
});

export const updateTeacherSchema = createTeacherSchema.partial();

export const createCourseSchema = z.object({
  name: z.string().min(2, "Course name is required"),
  slug: z.string().min(2, "Course slug is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().default("General"),
  ageGroup: z.string().default("All Ages"),
  level: z.string().default("Beginner"),
  duration: z.string().default("3 Months"),
});

export const updateCourseSchema = createCourseSchema.partial();

export const createClassSchema = z.object({
  courseId: z.string().min(1, "Course is required"),
  teacherId: z.string().min(1, "Teacher is required"),
  scheduledDate: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  timezone: z.string().default("UTC"),
  classType: z.enum(["ONE_TO_ONE", "GROUP"]).default("ONE_TO_ONE"),
  meetingPlatform: z.enum(["ZOOM", "GOOGLE_MEET"]).default("ZOOM"),
  meetingUrl: z.string().url("Valid meeting URL is required"),
  studentIds: z.array(z.string()).min(1, "At least one student must be assigned"),
});

export const markAttendanceSchema = z.object({
  classId: z.string().min(1, "Class ID is required"),
  studentId: z.string().min(1, "Student ID is required"),
  status: z.enum(["PRESENT", "ABSENT", "LATE"]),
  note: z.string().optional(),
});

export const addTopicCoveredSchema = z.object({
  classId: z.string().min(1, "Class ID is required"),
  studentId: z.string().min(1, "Student ID is required"),
  title: z.string().min(2, "Topic title is required"),
  description: z.string().optional(),
});

export const addTeacherNoteSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  classId: z.string().optional(),
  note: z.string().min(2, "Note content is required"),
  visibility: z.enum(["STUDENT_VISIBLE", "INTERNAL"]).default("STUDENT_VISIBLE"),
});

export const updateProgressSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
  progressPercentage: z.number().min(0).max(100),
  currentLevel: z.string().default("Intermediate"),
  completedTopics: z.number().int().min(0),
  totalTopics: z.number().int().min(1),
});

export const createAssignmentSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  dueDate: z.string().optional(),
  attachmentUrl: z.string().optional(),
});

export const submitAssignmentSchema = z.object({
  assignmentId: z.string().min(1, "Assignment ID is required"),
  submissionText: z.string().optional(),
  attachmentUrl: z.string().optional(),
});

export const reviewSubmissionSchema = z.object({
  submissionId: z.string().min(1, "Submission ID is required"),
  status: z.enum(["PENDING", "SUBMITTED", "REVIEWED"]),
  teacherFeedback: z.string().optional(),
});

export const createAssessmentSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  assessmentDate: z.string().optional(),
  totalMarks: z.number().int().min(1).default(100),
});

export const recordAssessmentResultSchema = z.object({
  assessmentId: z.string().min(1, "Assessment ID is required"),
  studentId: z.string().min(1, "Student ID is required"),
  obtainedMarks: z.number().int().min(0),
  remarks: z.string().optional(),
});

export const createCertificateSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
  completionDate: z.string().optional(),
  issuedBy: z.string().default("Al-Qalam Global Academy"),
});
