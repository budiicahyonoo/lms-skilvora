import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, Phone } from "lucide-react"

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-2xl text-[#00033D] tracking-tight">
            Skilvora<span className="text-[#0033FF]">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-[#00033D]/70 hover:text-[#0033FF] transition-colors">Beranda</Link>
            <Link href="/courses" className="text-sm font-semibold text-[#00033D]/70 hover:text-[#0033FF] transition-colors">Katalog Kelas</Link>
            <Link href="/roadmap" className="text-sm font-semibold text-[#00033D]/70 hover:text-[#0033FF] transition-colors">Roadmap Belajar</Link>
            <Link href="/verify" className="text-sm font-semibold text-[#00033D]/70 hover:text-[#0033FF] transition-colors">Cek Sertifikat</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="px-5 py-2.5 text-sm font-bold text-[#0033FF] hover:bg-[#0033FF]/5 rounded-xl transition-colors">
              Masuk
            </Link>
            <Button asChild className="bg-[#0033FF] hover:bg-[#0029CC] text-white font-bold px-6 py-2.5 rounded-xl shadow-[0_4px_20px_rgba(0,51,255,0.25)]">
              <Link href="/auth/register">Daftar Gratis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#00033D] text-white pt-16 pb-8 border-t border-white/10 mt-auto">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <Link href="/" className="font-extrabold text-3xl tracking-tight text-white">
                Skilvora<span className="text-[#0033FF]">.</span>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Platform edukasi teknologi terdepan untuk mencetak talenta digital berkualitas yang siap bersaing di industri global.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-white">Navigasi Utama</h4>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li><Link href="/courses" className="hover:text-white transition-colors">Katalog Kelas</Link></li>
                <li><Link href="/roadmap" className="hover:text-white transition-colors">Roadmap Belajar</Link></li>
                <li><Link href="/verify" className="hover:text-white transition-colors">Verifikasi Sertifikat</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-white">Informasi Tambahan</h4>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li><span className="cursor-pointer hover:text-white transition-colors">Pusat Bantuan (FAQ)</span></li>
                <li><span className="cursor-pointer hover:text-white transition-colors">Syarat & Ketentuan</span></li>
                <li><span className="cursor-pointer hover:text-white transition-colors">Kebijakan Privasi</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-4 text-white">Hubungi Kami</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#0033FF]" /> support@skilvora.com</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#0033FF]" /> +62 811 2233 4455</li>
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#0033FF] shrink-0 mt-0.5" /> Jakarta Selatan, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-white/40 text-sm pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
            <p>&copy; {new Date().getFullYear()} Skilvora. Hak Cipta Dilindungi.</p>
            <p className="mt-2 md:mt-0">Dibuat dengan penuh dedikasi untuk pendidikan Indonesia.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}