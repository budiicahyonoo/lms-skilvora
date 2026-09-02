import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
      <Badge variant="default" className="mb-6">Platform Belajar IT Terarah</Badge>
      <h1 className="text-5xl font-extrabold text-[#00033D] tracking-tight leading-tight max-w-3xl mb-6">
        Skill Explorer: Mulai Karier <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0033FF] to-[#977DFF]">Full Stack Developer</span> Dari Nol
      </h1>
      <p className="text-lg text-[#00033D]/70 max-w-2xl mb-10">
        Berhenti lompat-lompat tutorial. Ikuti roadmap belajar terstruktur, 
        kerjakan proyek nyata, dan dapatkan sertifikat untuk portofolio Anda.
      </p>
      
      <div className="flex gap-4 mb-24">
        <Button size="lg" asChild>
          <Link href="/roadmap">Lihat Roadmap Belajar</Link>
        </Button>
        <Button variant="secondary" size="lg" asChild>
          <Link href="/courses">Eksplor Kelas</Link>
        </Button>
      </div>

      {/* Feature Section */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
        <GlassCard className="p-6">
          <div className="w-12 h-12 rounded-full bg-[#0033FF]/10 flex items-center justify-center mb-4 text-[#0033FF] font-bold">1</div>
          <h3 className="text-xl font-bold text-[#00033D] mb-2">Roadmap Visual</h3>
          <p className="text-[#00033D]/70 text-sm">Alur belajar yang jelas dari pemula hingga mahir, memastikan fondasi kuat di setiap tahap.</p>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="w-12 h-12 rounded-full bg-[#0033FF]/10 flex items-center justify-center mb-4 text-[#0033FF] font-bold">2</div>
          <h3 className="text-xl font-bold text-[#00033D] mb-2">Progress Tracking</h3>
          <p className="text-[#00033D]/70 text-sm">Sistem otomatis mencatat modul yang diselesaikan. Lanjutkan belajar kapan saja tanpa bingung.</p>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="w-12 h-12 rounded-full bg-[#0033FF]/10 flex items-center justify-center mb-4 text-[#0033FF] font-bold">3</div>
          <h3 className="text-xl font-bold text-[#00033D] mb-2">Sertifikat Digital</h3>
          <p className="text-[#00033D]/70 text-sm">Lulus kuis akhir kelas dan dapatkan sertifikat dengan kode verifikasi unik untuk LinkedIn.</p>
        </GlassCard>
      </div>
    </div>
  )
}