import { PublicLayout } from "@/components/layouts/public-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { Compass, CheckCircle2 } from "lucide-react";

export default function PublicRoadmapPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-[#00033D] mb-4">Roadmap Alur Belajar</h1>
          <p className="text-[#00033D]/70 max-w-2xl mx-auto">
            Peta jalan terstruktur dari tingkat pemula hingga mahir agar Anda tidak bingung harus mulai belajar dari mana.
          </p>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-8 border-l-4 border-l-[#0033FF]">
            <div className="flex items-center gap-3 mb-3">
              <Compass className="w-6 h-6 text-[#0033FF]" />
              <h3 className="text-xl font-bold text-[#00033D]">Level 1: Fondasi Pemrograman & Logika</h3>
            </div>
            <p className="text-[#00033D]/70 text-sm mb-4">Mempelajari dasar-dasar algoritma, pemahaman sintaks dasar, dan logika pemrograman modular.</p>
            <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Tersedia di Katalog Kelas
            </div>
          </GlassCard>

          <GlassCard className="p-8 border-l-4 border-l-[#0033FF]">
            <div className="flex items-center gap-3 mb-3">
              <Compass className="w-6 h-6 text-[#0033FF]" />
              <h3 className="text-xl font-bold text-[#00033D]">Level 2: Pengembangan Full-Stack Web & API</h3>
            </div>
            <p className="text-[#00033D]/70 text-sm mb-4">Membangun antarmuka interaktif dengan React/Next.js dan merancang backend tangguh dengan NestJS & Prisma.</p>
            <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Tersedia di Katalog Kelas
            </div>
          </GlassCard>
        </div>
      </div>
    </PublicLayout>
  );
}