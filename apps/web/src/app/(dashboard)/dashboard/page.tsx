'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthService, UserProfile } from "@/services/auth.service";

export default function DashboardHomePage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    AuthService.getProfile().then(setUser).catch(() => {});
  }, []);

  if (!user) return <div className="animate-pulse bg-white/10 h-32 rounded-xl"></div>;

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#00033D] mb-2">Selamat Datang, {user.name}!</h1>
        <p className="text-[#00033D]/70">
          {user.role === 'STUDENT' && "Lanjutkan progres belajar Anda hari ini dan capai target roadmap."}
          {user.role === 'INSTRUCTOR' && "Pantau performa kelas dan progres siswa Anda."}
          {user.role === 'ADMIN' && "Kelola operasional platform Skilvora secara menyeluruh."}
        </p>
      </div>

      {/* TAMPILAN SISWA */}
      {user.role === 'STUDENT' && (
        <>
          <h2 className="text-xl font-bold text-[#00033D] mb-4">Ringkasan Belajar</h2>
          <div className="grid md:grid-cols-3 gap-6">
             <GlassCard className="p-6">
                <p className="text-sm font-medium text-[#00033D]/60 mb-2">Kelas Aktif</p>
                <p className="text-3xl font-bold text-[#0033FF]">2</p>
             </GlassCard>
             <GlassCard className="p-6">
                <p className="text-sm font-medium text-[#00033D]/60 mb-2">Sertifikat Diperoleh</p>
                <p className="text-3xl font-bold text-[#0033FF]">0</p>
             </GlassCard>
          </div>
        </>
      )}

      {/* TAMPILAN INSTRUKTUR */}
      {user.role === 'INSTRUCTOR' && (
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold text-[#00033D]">HTML & CSS Dasar</h3>
               <Badge>Published</Badge>
             </div>
             <p className="text-[#00033D]/70 mb-4">124 Siswa Terdaftar</p>
             <Button variant="secondary" asChild><Link href="/dashboard/manage-classes/html-css-dasar">Kelola Konten</Link></Button>
          </GlassCard>
        </div>
      )}

      {/* TAMPILAN ADMIN */}
      {user.role === 'ADMIN' && (
        <div className="grid md:grid-cols-3 gap-6">
           <GlassCard className="p-6">
              <p className="text-sm font-medium text-[#00033D]/60 mb-2">Total Siswa</p>
              <p className="text-3xl font-bold text-[#0033FF]">1,402</p>
           </GlassCard>
           <GlassCard className="p-6">
              <p className="text-sm font-medium text-[#00033D]/60 mb-2">Transaksi Pending</p>
              <p className="text-3xl font-bold text-red-500">12</p>
           </GlassCard>
        </div>
      )}
    </div>
  );
}