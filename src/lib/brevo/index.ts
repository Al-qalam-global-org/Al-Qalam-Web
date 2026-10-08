import { env } from "@/lib/env";

export class BrevoEmailService {
  private apiKey: string;
  private senderEmail: string;
  private senderName: string;

  constructor() {
    this.apiKey = env.BREVO_API_KEY || "";
    this.senderEmail = env.BREVO_SENDER_EMAIL || "admissions@alqalamglobal.com";
    this.senderName = env.BREVO_SENDER_NAME || "Al-Qalam Global Academy";
  }

  async sendEmail(params: {
    toEmail: string;
    toName?: string;
    subject: string;
    htmlContent: string;
    textContent?: string;
  }): Promise<boolean> {
    if (!this.apiKey) {
      console.log(
        `[Brevo Mock Email Sent] To: ${params.toEmail} | Subject: ${params.subject}`
      );
      return true;
    }

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": this.apiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: this.senderName,
            email: this.senderEmail,
          },
          to: [
            {
              email: params.toEmail,
              name: params.toName || params.toEmail,
            },
          ],
          subject: params.subject,
          htmlContent: params.htmlContent,
          textContent: params.textContent,
        }),
      });

      if (!response.ok) {
        const errBody = await response.text();
        console.error("[Brevo API Error Response]", response.status, errBody);
        return false;
      }

      return true;
    } catch (error) {
      console.error("[Brevo Email Delivery Error]", error);
      // Fail gracefully without interrupting application requests
      return false;
    }
  }

  async sendWelcomeEmail(toEmail: string, name: string, role: string) {
    const subject = `Welcome to Al-Qalam Global Academy, ${name}!`;
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #dfe3e0; border-radius: 12px; background: #fdfbf5;">
        <h2 style="color: #0c3326; margin-top: 0;">Welcome to Al-Qalam Global Academy</h2>
        <p style="color: #6a746e; font-size: 14px;">Learn Islam. Live with Purpose.</p>
        <hr style="border: none; border-top: 1px solid #dfe3e0; margin: 20px 0;" />
        <p style="color: #1b211e; line-height: 1.6;">Assalamu Alaikum <strong>${name}</strong>,</p>
        <p style="color: #1b211e; line-height: 1.6;">Your account has been created with role: <strong>${role}</strong>. You can now log in to the portal to access your classes, schedule, and course materials.</p>
        <div style="margin: 30px 0;">
          <a href="${env.APP_URL}/login" style="background: #0c3326; color: #fdfbf5; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Log In to Portal</a>
        </div>
        <p style="color: #6a746e; font-size: 12px; margin-top: 30px;">Al-Qalam Global Academy — Islamic Education for Every Generation</p>
      </div>
    `;
    return this.sendEmail({ toEmail, toName: name, subject, htmlContent });
  }

  async sendPasswordResetEmail(toEmail: string, resetLink: string) {
    const subject = "Reset Your Al-Qalam Global Academy Password";
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #dfe3e0; border-radius: 12px; background: #fdfbf5;">
        <h2 style="color: #0c3326; margin-top: 0;">Password Reset Request</h2>
        <p style="color: #1b211e; line-height: 1.6;">You requested a password reset for your Al-Qalam account. Click the button below to choose a new password. This link will expire in 1 hour.</p>
        <div style="margin: 30px 0;">
          <a href="${resetLink}" style="background: #0c3326; color: #fdfbf5; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #6a746e; font-size: 12px;">If you didn't request this, please ignore this email.</p>
      </div>
    `;
    return this.sendEmail({ toEmail, subject, htmlContent });
  }

  async sendClassScheduledEmail(
    toEmail: string,
    studentName: string,
    courseName: string,
    scheduledDate: string,
    time: string,
    meetingUrl: string
  ) {
    const subject = `New Class Scheduled: ${courseName}`;
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #dfe3e0; border-radius: 12px; background: #fdfbf5;">
        <h2 style="color: #0c3326; margin-top: 0;">Class Scheduled</h2>
        <p style="color: #1b211e; line-height: 1.6;">Assalamu Alaikum <strong>${studentName}</strong>,</p>
        <p style="color: #1b211e; line-height: 1.6;">A new class has been scheduled for <strong>${courseName}</strong> on <strong>${scheduledDate} at ${time}</strong>.</p>
        <div style="margin: 30px 0;">
          <a href="${meetingUrl}" style="background: #1f7a4d; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Join Class Meeting</a>
        </div>
      </div>
    `;
    return this.sendEmail({ toEmail, toName: studentName, subject, htmlContent });
  }
}

export const brevoEmailService = new BrevoEmailService();
