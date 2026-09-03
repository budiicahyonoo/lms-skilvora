'use client';
import { GlassCard } from '@/components/ui/glass-card';

export default function AdminVerificationsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[#00033D] mb-2">Verifikasi Pembayaran</h1>
      <p className="text-[#00033D]/70 mb-8">Periksa dan setujui bukti transfer manual dari siswa.</p>
      <GlassCard className="p-12 text-center text-[#00033D]/60 font-medium">
        Belum ada transaksi pending yang memerlukan verifikasi.
      </GlassCard>
    </div>
  );
}