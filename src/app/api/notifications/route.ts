import { NextRequest, NextResponse } from "next/server";
import { notificationService } from "@/server/services/notification.service";
import { requireAuth } from "@/lib/auth/permissions";
import { handleApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);
    const unreadOnly = searchParams.get("unread") === "true";

    const notifications = await notificationService.getUserNotifications(
      user.id,
      unreadOnly ? false : undefined
    );

    return NextResponse.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await req.json();

    if (body.all) {
      await notificationService.markAllAsRead(user.id);
      return NextResponse.json({ success: true, message: "All marked as read" });
    }

    if (body.id) {
      await notificationService.markAsRead(body.id, user.id);
      return NextResponse.json({ success: true, message: "Notification marked as read" });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
