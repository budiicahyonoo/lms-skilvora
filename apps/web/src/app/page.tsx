import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layouts/public-layout";
import { ArrowRight, Code, Trophy, Users } from "lucide-react";

export default function Home() {
  return (
    <PublicLayout>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAEDFB]/50 to-[#FAFAFA] pt-24 pb-32">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-[#0033FF]/10 text-[#0033FF] text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-[#0033FF]/20">
            Platform Belajar IT & Coding #1
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#00033D] tracking-tight leading-[1.1] mb-8">
            Bangun Karir Impianmu di Dunia <span className="text-[#0033FF] relative">Teknologi<svg className="absolute w-full h-3 -bottom-1 left-0 text-[#0033FF]/20" fill="currentColor" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z"></path></svg></span>
          </h1>
          <p className="text-lg md:text-xl text-[#00033D]/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Pelajari keahlian digital langsung dari praktisi industri, selesaikan proyek nyata, dan raih sertifikat kompetensi untuk memenangkan persaingan kerja.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto h-14 px-8 text-base bg-[#0033FF] hover:bg-[#0029CC] text-white shadow-lg shadow-[#0033FF]/30 transition-transform hover:scale-105">
              <Link href="/courses">Mulai Belajar Sekarang <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button size="lg" variant="default" asChild className="w-full sm:w-auto h-14 px-8 text-base border-2 border-[#00033D]/10 hover:bg-[#00033D]/5 text-[#00033D] transition-transform hover:scale-105">
              <Link href="/roadmap">Lihat Alur Belajar</Link>
            </Button>
          </div>
        </div>

        {/* Decorative Blurred Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#0033FF]/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      </section>

      {/* FEATURES / USP SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#00033D] mb-4">Kenapa Memilih Skilvora?</h2>
            <p className="text-[#00033D]/60 max-w-xl mx-auto text-lg">
              Kami merancang pengalaman belajar yang aplikatif dan 100% selaras dengan kebutuhan industri nyata.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Fitur 1 */}
            <div className="p-8 rounded-3xl bg-[#FAFAFA] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0033FF]/10 text-[#0033FF] flex items-center justify-center mb-6">
                <Code className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#00033D] mb-3">Kurikulum Industri</h3>
              <p className="text-[#00033D]/60 text-sm leading-relaxed">
                Materi dirombak secara berkala sesuai standar dan _stack_ teknologi terbaru yang dipakai oleh _tech company_ global.
              </p>
            </div>
            
            {/* Fitur 2 */}
            <div className="p-8 rounded-3xl bg-[#FAFAFA] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 text-green-600 flex items-center justify-center mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#00033D] mb-3">Instruktur Ahli</h3>
              <p className="text-[#00033D]/60 text-sm leading-relaxed">
                Anda belajar dibimbing langsung oleh Senior Developer dan praktisi IT yang telah berpengalaman bertahun-tahun di industrinya.
              </p>
            </div>
            
            {/* Fitur 3 */}
            <div className="p-8 rounded-3xl bg-[#FAFAFA] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-6">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#00033D] mb-3">Sertifikasi Kredibel</h3>
              <p className="text-[#00033D]/60 text-sm leading-relaxed">
                Buktekan kompetensi Anda dengan sertifikat kelulusan digital yang memiliki kode verifikasi QR unik untuk _resume_ Anda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}