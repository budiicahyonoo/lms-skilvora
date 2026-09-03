'use client';
import { GlassCard } from '@/components/ui/glass-card';

export default function AdminUsersPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[#00033D] mb-2">Manajemen Pengguna</h1>
      <p className="text-[#00033D]/70 mb-8">Lihat dan kelola seluruh data Siswa dan Instruktur di platform.</p>
      <GlassCard className="p-12 text-center text-[#00033D]/60 font-medium">
        Tabel data pengguna akan ditampilkan di sini.
      </GlassCard>
    </div>
  );
}