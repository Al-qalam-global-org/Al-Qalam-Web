export class WhatsAppService {
  /**
   * Generates a direct WhatsApp click-to-chat URL.
   * Cleans non-digits from phone number and URI encodes the pre-filled message.
   */
  generateChatLink(phoneNumber: string, message: string): string {
    const cleanedNumber = phoneNumber.replace(/[^0-9]/g, "");
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanedNumber}?text=${encodedMessage}`;
  }

  generateStudentContactLink(
    phone: string,
    studentName: string,
    courseName?: string
  ): string {
    const text = `Assalamu Alaikum ${studentName}, this is Al-Qalam Global Academy regarding your ${
      courseName ? courseName + " course" : "studies"
    }.`;
    return this.generateChatLink(phone, text);
  }

  generateParentContactLink(
    parentPhone: string,
    parentName: string,
    studentName: string
  ): string {
    const text = `Assalamu Alaikum ${parentName}, this is Al-Qalam Global Academy regarding ${studentName}'s learning progress.`;
    return this.generateChatLink(parentPhone, text);
  }

  generateTeacherContactLink(teacherPhone: string, teacherName: string): string {
    const text = `Assalamu Alaikum Ustadh/Ustadhah ${teacherName}, this is Al-Qalam Global Academy administration.`;
    return this.generateChatLink(teacherPhone, text);
  }

  generateClassLinkShare(
    phone: string,
    studentName: string,
    courseName: string,
    dateTime: string,
    meetingUrl: string
  ): string {
    const text = `Assalamu Alaikum ${studentName},\nYour live class for ${courseName} is scheduled for ${dateTime}.\nMeeting Link: ${meetingUrl}\n\n— Al-Qalam Global Academy`;
    return this.generateChatLink(phone, text);
  }
}

export const whatsappService = new WhatsAppService();
