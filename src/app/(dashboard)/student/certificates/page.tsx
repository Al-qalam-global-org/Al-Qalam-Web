"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { CertificateView } from "@/components/shared/CertificateView";
import { Award, Printer, CheckCircle2, Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function StudentCertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCert, setActiveCert] = useState<any | null>(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/certificates");
      const data = await res.json();
      if (data.success) {
        setCertificates(data.data.certificates);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-6">
      <Header
        title="My Certificates of Completion"
        subtitle="View, print, and download your officially verified course completion credentials"
        role="STUDENT"
      />

      {loading ? (
        <p className="text-center py-10 text-xs text-charcoal-500">
          Loading certificates...
        </p>
      ) : certificates.length === 0 ? (
        <Card className="text-center py-12">
          <Award className="mx-auto h-12 w-12 text-gold-500/60 mb-3" />
          <h3 className="font-serif text-lg font-bold text-green-950">
            No Certificates Issued Yet
          </h3>
          <p className="text-xs text-charcoal-500 max-w-sm mx-auto mt-1">
            Complete all modules, attendance requirements, and final evaluations in your enrolled courses to receive your certified certificate.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <Card key={cert.id} className="flex flex-col justify-between border-gold-500/30">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="gold">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </Badge>
                  <span className="font-mono text-xs text-charcoal-500">
                    {cert.certificateNumber}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-green-950">
                      {cert.course.name}
                    </h4>
                    <p className="text-xs text-charcoal-500">
                      Completed: {formatDate(cert.completionDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-200">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => setActiveCert(cert)}
                >
                  <Printer className="h-4 w-4 mr-1.5" /> View &amp; Print Certificate
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Certificate Viewer Modal */}
      {activeCert && (
        <Modal
          isOpen={true}
          onClose={() => setActiveCert(null)}
          title="Course Completion Certificate"
          maxWidth="2xl"
        >
          <CertificateView certificate={activeCert} />
        </Modal>
      )}
    </div>
  );
}
