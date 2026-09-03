'use client';
import { GlassCard } from '@/components/ui/glass-card';

export default function AdminRoadmapPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[#00033D] mb-2">Kelola Roadmap Pembelajaran</h1>
      <p className="text-[#00033D]/70 mb-8">Atur alur belajar terstruktur untuk ditampilkan di halaman publik.</p>
      <GlassCard className="p-12 text-center text-[#00033D]/60 font-medium">
        Modul manajemen roadmap akan segera tersedia.
      </GlassCard>
    </div>
  );
}