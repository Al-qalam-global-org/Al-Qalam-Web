# Database Architecture & Schema

## Entity Relationship Overview

```
User (id, email, passwordHash, role, status)
├── Student (userId, grade, level, parentName, parentPhone)
│   ├── StudentCourse (courseId, status, currentProgress)
│   ├── TeacherStudentAssignment (teacherId, courseId)
│   ├── ClassStudent (classId)
│   ├── Attendance (classId, status, note, markedBy)
│   ├── TopicCovered (classId, title, description)
│   ├── TeacherNote (teacherId, note, visibility)
│   ├── StudentProgress (courseId, progressPercentage, completedTopics)
│   ├── AssignmentSubmission (assignmentId, status, teacherFeedback)
│   ├── AssessmentResult (assessmentId, obtainedMarks, remarks)
│   └── Certificate (courseId, certificateNumber, issuedBy)
│
├── Teacher (userId, qualification, experienceYears, specialization)
│   ├── TeacherStudentAssignment
│   ├── Class (courseId, scheduledDate, meetingUrl)
│   ├── TeacherNote
│   ├── Assignment
│   └── Assessment
│
└── Session (userId, sessionToken, expiresAt)
```

## Indexes & Constraints
- `User.email` (UNIQUE, INDEXED)
- `Course.slug` (UNIQUE, INDEXED)
- `Certificate.certificateNumber` (UNIQUE, INDEXED)
- `Attendance`: `[classId, studentId]` (UNIQUE composite)
- `AssessmentResult`: `[assessmentId, studentId]` (UNIQUE composite)
- `StudentCourse`: `[studentId, courseId]` (UNIQUE composite)
- `TeacherStudentAssignment`: `[teacherId, studentId, courseId]` (UNIQUE composite)
