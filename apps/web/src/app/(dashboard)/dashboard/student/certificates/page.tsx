'use client';

import { useEffect, useState } from "react";
import { Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { EnrollmentService } from "@/services/enrollment.service";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    EnrollmentService.getMyCertificates()
      .then(setCertificates)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="animate-pulse bg-white/10 h-64 rounded-xl max-w-5xl"></div>;

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#00033D] mb-2">Sertifikat Saya</h1>
        <p className="text-[#00033D]/70">Bukti pencapaian dan kelulusan Anda dari kelas Skilvora.</p>
      </div>

      {certificates.length === 0 ? (
        <GlassCard className="p-12 text-center flex flex-col items-center">
          <Award className="w-16 h-16 text-[#00033D]/20 mb-4" />
          <h3 className="text-xl font-bold text-[#00033D] mb-2">Belum ada sertifikat</h3>
          <p className="text-[#00033D]/60">Selesaikan kuis akhir kelas untuk mendapatkan sertifikat.</p>
        </GlassCard>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <GlassCard key={cert.id} className="p-6 border-l-4 border-l-[#0033FF] flex flex-col justify-between">
              <div>
                <p className="text-sm font-semibold text-[#00033D]/60 mb-2">Diberikan atas kelulusan kelas:</p>
                <h3 className="text-xl font-bold text-[#00033D] mb-4">{cert.class.title}</h3>
                
                <div className="bg-white/50 p-4 rounded-lg mb-6">
                  <p className="text-xs text-[#00033D]/60 uppercase tracking-wider mb-1">Kode Verifikasi (UUID)</p>
                  <p className="font-mono font-bold text-[#0033FF]">{cert.verificationCode}</p>
                  <p className="text-xs text-[#00033D]/60 mt-2">
                    Diterbitkan: {new Date(cert.issuedAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
              
              <Button variant="secondary" className="w-full gap-2" onClick={() => window.print()}>
                <Download className="w-4 h-4" /> Simpan / Cetak PDF
              </Button>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}