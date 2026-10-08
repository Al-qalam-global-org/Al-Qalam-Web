import { classRepository } from "@/server/repositories/class.repository";
import { auditRepository } from "@/server/repositories/audit.repository";
import { notificationRepository } from "@/server/repositories/notification.repository";
import { brevoEmailService } from "@/lib/brevo";
import { NotFoundError } from "@/lib/errors";
import { formatDate } from "@/lib/utils";
import type {
  ClassStatus,
  ClassType,
  MeetingPlatform,
} from "@prisma/client";

export class ClassService {
  async getClasses(params?: {
    teacherId?: string;
    studentId?: string;
    courseId?: string;
    status?: ClassStatus;
    startDate?: Date;
    endDate?: Date;
    skip?: number;
    take?: number;
  }) {
    return classRepository.findAll(params);
  }

  async getClassById(id: string) {
    const cls = await classRepository.findById(id);
    if (!cls) throw new NotFoundError("Class not found");
    return cls;
  }

  async scheduleClass(
    data: {
      courseId: string;
      teacherId: string;
      scheduledDate: string;
      startTime: string;
      endTime: string;
      timezone?: string;
      classType?: ClassType;
      meetingPlatform?: MeetingPlatform;
      meetingUrl: string;
      studentIds: string[];
    },
    adminUserId?: string
  ) {
    const scheduledDateObj = new Date(data.scheduledDate);

    const newClass = await classRepository.create({
      courseId: data.courseId,
      teacherId: data.teacherId,
      scheduledDate: scheduledDateObj,
      startTime: data.startTime,
      endTime: data.endTime,
      timezone: data.timezone || "UTC",
      classType: data.classType || "ONE_TO_ONE",
      meetingPlatform: data.meetingPlatform || "ZOOM",
      meetingUrl: data.meetingUrl,
      studentIds: data.studentIds,
    });

    await auditRepository.log({
      userId: adminUserId,
      action: "CLASS_SCHEDULED",
      entity: "Class",
      entityId: newClass.id,
      metadata: { courseId: data.courseId, date: data.scheduledDate },
    });

    // Notify students and teacher asynchronously
    if (newClass.teacher?.userId) {
      await notificationRepository.create({
        userId: newClass.teacher.userId,
        title: "New Class Scheduled",
        message: `You have a class for ${newClass.course.name} on ${formatDate(
          scheduledDateObj
        )} at ${data.startTime}`,
        type: "CLASS_SCHEDULED",
      });
    }

    for (const member of newClass.students) {
      if (member.student?.user?.id) {
        await notificationRepository.create({
          userId: member.student.user.id,
          title: "Class Scheduled",
          message: `Your class for ${newClass.course.name} is on ${formatDate(
            scheduledDateObj
          )} at ${data.startTime}`,
          type: "CLASS_SCHEDULED",
        });

        if (member.student.user.email) {
          brevoEmailService.sendClassScheduledEmail(
            member.student.user.email,
            `${member.student.firstName} ${member.student.lastName}`,
            newClass.course.name,
            formatDate(scheduledDateObj),
            `${data.startTime} - ${data.endTime}`,
            data.meetingUrl
          );
        }
      }
    }

    return newClass;
  }

  async updateClassStatus(id: string, status: ClassStatus, userId?: string) {
    const updated = await classRepository.update(id, { status });

    await auditRepository.log({
      userId,
      action: `CLASS_${status}`,
      entity: "Class",
      entityId: id,
    });

    return updated;
  }
}

export const classService = new ClassService();
