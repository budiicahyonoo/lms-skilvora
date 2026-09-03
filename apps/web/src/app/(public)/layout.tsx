import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="sticky top-0 z-50 w-full bg-white/30 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-[#00033D] tracking-tight">
            Skilvora<span className="text-[#0033FF]">.</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/roadmap" className="text-sm font-medium text-[#00033D]/80 hover:text-[#0033FF] transition-colors">Roadmap</Link>
            <Link href="/courses" className="text-sm font-medium text-[#00033D]/80 hover:text-[#0033FF] transition-colors">Katalog Kelas</Link>
            <Link href="/verify" className="text-sm font-medium text-[#00033D]/80 hover:text-[#0033FF] transition-colors">Verifikasi Sertifikat</Link>
          </nav>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/auth/login">Masuk</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/register">Daftar</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  )
}