'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { EnrollmentService } from "@/services/enrollment.service";

export default function LearningRoomPage() {
  const params = useParams();
  const classId = params.classId as string;
  
  const [data, setData] = useState<any>(null);
  const [activeModule, setActiveModule] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const res = await EnrollmentService.getEnrollmentDetails(classId);
      setData(res);
      // Set active module ke modul pertama jika belum ada
      if (res.class.modules.length > 0 && !activeModule) {
        setActiveModule(res.class.modules[0]);
      }
    } catch (error) {
      toast.error("Gagal memuat ruang belajar");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  const handleMarkComplete = async () => {
    if (!activeModule || !data) return;
    try {
      await EnrollmentService.updateProgress(data.id, activeModule.id, 'COMPLETED');
      toast.success("Modul diselesaikan!");
      fetchDetails(); // Refresh progres
    } catch (error) {
      toast.error("Gagal memperbarui progres");
    }
  };

  if (isLoading) return <div className="animate-pulse bg-white/10 h-screen rounded-xl"></div>;
  if (!data) return <div>Data tidak ditemukan.</div>;

  const isCompleted = (moduleId: string) => {
    const prog = data.progresses.find((p: any) => p.moduleId === moduleId);
    return prog?.status === 'COMPLETED';
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6">
      {/* Sidebar Modul */}
      <GlassCard className="w-80 p-0 flex flex-col overflow-hidden shrink-0">
        <div className="p-4 border-b border-white/20">
          <Link href="/dashboard/classes" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00033D]/70 hover:text-[#0033FF] mb-4">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Kelas
          </Link>
          <h2 className="font-bold text-[#00033D] line-clamp-2">{data.class.title}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {data.class.modules.map((modul: any) => (
            <button
              key={modul.id}
              onClick={() => setActiveModule(modul)}
              className={`w-full text-left p-3 rounded-lg flex gap-3 items-start transition-colors ${activeModule?.id === modul.id ? 'bg-[#0033FF]/10 border border-[#0033FF]/20' : 'hover:bg-white/40'}`}
            >
              {isCompleted(modul.id) ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-[#00033D]/30 shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`text-sm font-semibold ${activeModule?.id === modul.id ? 'text-[#0033FF]' : 'text-[#00033D]'}`}>
                  {modul.order}. {modul.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Area Konten Utama */}
      <GlassCard className="flex-1 p-8 overflow-y-auto flex flex-col">
        {activeModule ? (
          <div className="max-w-3xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-[#00033D] mb-6">{activeModule.title}</h1>
            
            {activeModule.videoUrl && (
              <div className="aspect-video bg-black rounded-xl mb-8 overflow-hidden">
                <iframe 
                  className="w-full h-full"
                  src={activeModule.videoUrl.replace("watch?v=", "embed/")}
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className="prose prose-blue max-w-none text-[#00033D]/80 mb-12 whitespace-pre-wrap">
              {activeModule.content}
            </div>

            <div className="pt-6 border-t border-white/20 flex justify-between items-center">
              <Button 
                onClick={handleMarkComplete} 
                disabled={isCompleted(activeModule.id)}
                variant={isCompleted(activeModule.id) ? "secondary" : "default"}
              >
                {isCompleted(activeModule.id) ? 'Selesai Dipelajari' : 'Tandai Selesai'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-[#00033D]/50">
            Pilih modul di samping untuk mulai belajar.
          </div>
        )}
      </GlassCard>
    </div>
  );
}