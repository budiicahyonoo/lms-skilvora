import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"

export default function LearningSpacePage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl h-[calc(100vh-6rem)]">
      
      {/* Kolom Kiri: Video Player & Konten */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-8">
        <div className="aspect-video bg-[#030812] rounded-2xl overflow-hidden relative shadow-[0_8px_32px_rgba(0,3,61,0.2)] border border-white/20 flex items-center justify-center">
          <span className="text-white/50 font-medium">Video Player Placeholder</span>
        </div>
        
        <GlassCard className="p-8">
          <h1 className="text-2xl font-bold text-[#00033D] mb-2">1. Pengenalan Tag HTML</h1>
          <div className="prose prose-sm max-w-none text-[#00033D]/80">
            <p>Dalam modul ini, kita akan membahas struktur dasar dari dokumen HTML5. HTML (HyperText Markup Language) adalah kerangka dari setiap halaman web.</p>
            {/* Area untuk render Markdown nantinya */}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20 flex justify-between items-center">
            <Button variant="ghost">← Modul Sebelumnya</Button>
            <Button>Selesai & Lanjut →</Button>
          </div>
        </GlassCard>
      </div>

      {/* Kolom Kanan: Daftar Modul (Sidebar Modul) */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        <h3 className="font-bold text-[#00033D] text-lg">Daftar Modul</h3>
        <div className="flex flex-col gap-2 overflow-y-auto pb-8">
          {[1, 2, 3, 4, 5].map((modul) => (
            <GlassCard 
              key={modul} 
              className={`p-4 flex gap-3 cursor-pointer transition-colors ${modul === 1 ? 'border-[#0033FF]/50 bg-white/50' : 'hover:bg-white/40'}`}
            >
              <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${modul === 1 ? 'bg-[#0033FF] text-white' : 'bg-white/50 border border-white/50 text-[#00033D]/40'}`}>
                {modul === 1 ? '✓' : modul}
              </div>
              <div>
                <h5 className={`font-semibold text-sm ${modul === 1 ? 'text-[#0033FF]' : 'text-[#00033D]'}`}>
                  Pengenalan Tag HTML {modul}
                </h5>
                <p className="text-xs text-[#00033D]/60 mt-1">12 Menit</p>
              </div>
            </GlassCard>
          ))}
          
          <GlassCard className="p-4 flex gap-3 mt-4 bg-[#977DFF]/10 border-[#977DFF]/30">
             <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs bg-white/50 border border-white/50 text-[#00033D]/40">
                🔒
              </div>
              <div>
                <h5 className="font-semibold text-sm text-[#00033D]">Kuis Akhir Kelas</h5>
                <p className="text-xs text-[#00033D]/60 mt-1">Syarat Sertifikat</p>
              </div>
          </GlassCard>
        </div>
      </div>
      
    </div>
  )
}