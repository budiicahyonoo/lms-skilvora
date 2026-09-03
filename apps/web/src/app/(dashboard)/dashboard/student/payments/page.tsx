'use client';

import { useEffect, useState } from "react";
import { CreditCard, Upload, CheckCircle2, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { PaymentService } from "@/services/payment.service";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [proofInput, setProofInput] = useState<Record<string, string>>({});

  const fetchPayments = async () => {
    try {
      const data = await PaymentService.getMyPayments();
      setPayments(data);
    } catch (error) {
      toast.error("Gagal memuat data tagihan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleUpload = async (paymentId: string) => {
    const url = proofInput[paymentId];
    if (!url) return toast.error("Masukkan URL bukti transfer terlebih dahulu");

    try {
      await PaymentService.uploadProof(paymentId, url);
      toast.success("Bukti transfer berhasil dikirim! Menunggu verifikasi admin.");
      fetchPayments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal mengunggah bukti");
    }
  };

  if (isLoading) return <div className="animate-pulse bg-white/10 h-64 rounded-xl max-w-5xl"></div>;

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#00033D] mb-2">Tagihan & Pembayaran</h1>
        <p className="text-[#00033D]/70">Kelola status pembayaran kelas berbayar Anda di sini.</p>
      </div>

      {payments.length === 0 ? (
        <GlassCard className="p-12 text-center flex flex-col items-center">
          <CreditCard className="w-16 h-16 text-[#00033D]/20 mb-4" />
          <h3 className="text-xl font-bold text-[#00033D] mb-2">Tidak ada tagihan aktif</h3>
          <p className="text-[#00033D]/60">Anda belum mendaftar ke kelas berbayar.</p>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {payments.map((item) => (
            <GlassCard key={item.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'VERIFIED' ? 'bg-green-100 text-green-700' :
                    item.status === 'WAITING_APPROVAL' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {item.status === 'VERIFIED' ? 'Lunas / Terverifikasi' :
                     item.status === 'WAITING_APPROVAL' ? 'Menunggu Verifikasi Admin' : 'Belum Dibayar'}
                  </span>
                  <span className="text-xs text-[#00033D]/50">Metode: {item.method}</span>
                </div>
                
                <h3 className="text-xl font-bold text-[#00033D] mb-1">{item.enrollment.class.title}</h3>
                <p className="text-lg font-bold text-[#0033FF]">Rp {Number(item.amount).toLocaleString('id-ID')}</p>
              </div>

              <div className="w-full md:w-auto">
                {item.status === 'PENDING' && (
                  <div className="flex flex-col gap-2 w-full md:w-80">
                    <p className="text-xs font-semibold text-[#00033D]/70">Transfer ke BCA: 1234567890 a.n Skilvora</p>
                    <Input 
                      placeholder="Masukkan Link URL Bukti Transfer" 
                      value={proofInput[item.id] || ''}
                      onChange={(e) => setProofInput({ ...proofInput, [item.id]: e.target.value })}
                    />
                    <Button onClick={() => handleUpload(item.id)} className="w-full gap-2">
                      <Upload className="w-4 h-4" /> Kirim Bukti Bayar
                    </Button>
                  </div>
                )}
                {item.status === 'WAITING_APPROVAL' && (
                  <div className="flex items-center gap-2 text-yellow-600 font-medium text-sm">
                    <Clock className="w-5 h-5" /> Bukti sedang dicek admin.
                  </div>
                )}
                {item.status === 'VERIFIED' && (
                  <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                    <CheckCircle2 className="w-5 h-5" /> Akses kelas sudah terbuka!
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}