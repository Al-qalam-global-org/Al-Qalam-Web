import React from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { getCurrentUser } from "@/lib/auth/permissions";
import { notificationRepository } from "@/server/repositories/notification.repository";
import { formatDate } from "@/lib/utils";
import { Bell } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentNotificationsPage() {
  const user = await getCurrentUser();
  const notifications = user
    ? await notificationRepository.findByUserId(user.id)
    : [];

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="My Notifications"
        subtitle="Live announcements, class schedules, and teacher notes"
        role="STUDENT"
      />

      <Card className="divide-y divide-charcoal-200 p-0 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-charcoal-500">
            No notifications at this time.
          </div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="p-4 flex items-start gap-3.5 hover:bg-ivory-50/50 transition">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-900">
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-serif font-bold text-sm text-green-950">
                    {n.title}
                  </p>
                  <span className="text-[11px] text-charcoal-500">
                    {formatDate(n.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-charcoal-700">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}
