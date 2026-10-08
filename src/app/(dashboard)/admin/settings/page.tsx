import React from "react";
import { Header } from "@/components/dashboard/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Database, ShieldCheck, Mail, Cloud, Lock, Server } from "lucide-react";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <Header
        title="System Architecture &amp; Settings"
        subtitle="Database portability, external integrations, and security parameters"
        role="ADMIN"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Database Portability Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <Database className="h-5 w-5 text-green-900" />
              <CardTitle>PostgreSQL Engine</CardTitle>
            </div>
            <Badge variant="green">Standard PostgreSQL</Badge>
          </CardHeader>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            The platform is built on 100% portable PostgreSQL via Prisma ORM. No proprietary vendor locking or Supabase Auth/Storage coupling is present.
          </p>
          <div className="mt-4 rounded-xl bg-ivory-100 p-3 text-xs font-mono text-charcoal-700">
            DATABASE_URL: Configured via Environment
          </div>
        </Card>

        {/* Security Parameters */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <Lock className="h-5 w-5 text-gold-600" />
              <CardTitle>Authentication &amp; Hashing</CardTitle>
            </div>
            <Badge variant="gold">Argon2id Active</Badge>
          </CardHeader>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Application-owned authentication using Argon2id password hashing, HTTP-only secure cookie sessions, and centralized role-based access control.
          </p>
        </Card>

        {/* Brevo Email Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <Mail className="h-5 w-5 text-green-900" />
              <CardTitle>Brevo Email Service</CardTitle>
            </div>
            <Badge variant={env.BREVO_API_KEY ? "green" : "gray"}>
              {env.BREVO_API_KEY ? "Connected" : "Mock / Dev Mode"}
            </Badge>
          </CardHeader>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Transactional email engine dispatching welcome notifications, class invitations, password resets, and progress updates.
          </p>
        </Card>

        {/* Cloudinary Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <Cloud className="h-5 w-5 text-gold-600" />
              <CardTitle>Cloudinary File Storage</CardTitle>
            </div>
            <Badge variant={env.CLOUDINARY_CLOUD_NAME ? "green" : "gray"}>
              {env.CLOUDINARY_CLOUD_NAME ? "Active" : "Mock / Dev Mode"}
            </Badge>
          </CardHeader>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Secure cloud asset hosting for course materials, attachments, homework uploads, and certificates.
          </p>
        </Card>
      </div>
    </div>
  );
}
