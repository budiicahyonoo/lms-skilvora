'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Video, FileText, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { InstructorService } from "@/services/instructor.service";

export default function ManageClassContentPage() {
  const params = useParams();
  const classId = params.id as string;
  
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newModule, setNewModule] = useState({
    title: "",
    videoUrl: "",
    content: "",
    isFreePreview: false
  });

  const fetchCourse = async () => {
    try {
      const data = await InstructorService.getClassById(classId);
      setCourse(data);
    } catch (error) {
      toast.error("Gagal memuat detail kelas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [classId]);

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await InstructorService.createModule(classId, newModule);
      toast.success("Modul berhasil ditambahkan!");
      setNewModule({ title: "", videoUrl: "", content: "", isFreePreview: false });
      fetchCourse(); // Refresh daftar modul
    } catch (error) {
      toast.error("Gagal menambahkan modul");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm("Yakin ingin menghapus modul ini?")) return;
    try {
      await InstructorService.deleteModule(moduleId);
      toast.success("Modul berhasil dihapus");
      fetchCourse();
    } catch (error) {
      toast.error("Gagal menghapus modul");
    }
  };

  if (isLoading) return <div className="animate-pulse bg-white/10 h-64 rounded-xl max-w-5xl"></div>;
  if (!course) return <div>Kelas tidak ditemukan.</div>;

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/manage-classes"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#00033D]">{course.title}</h1>
          <p className="text-[#00033D]/70">Status: <span className="font-semibold">{course.status}</span></p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Daftar Modul */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-[#00033D] mb-4">Daftar Modul ({course.modules?.length})</h2>
          
          {course.modules?.length === 0 ? (
            <GlassCard className="p-8 text-center border-dashed border-2">
              <p className="text-[#00033D]/60">Belum ada modul. Silakan tambahkan materi pertama Anda.</p>
            </GlassCard>
          ) : (
            course.modules.map((modul: any) => (
              <GlassCard key={modul.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EAEDFB] flex items-center justify-center text-[#0033FF] font-bold shrink-0">
                    {modul.order}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#00033D]">{modul.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-[#00033D]/60">
                      {modul.videoUrl && <span className="flex items-center gap-1"><Video className="w-3 h-3" /> Video Terlampir</span>}
                      {modul.content && <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> Teks Terlampir</span>}
                      {modul.isFreePreview && <span className="text-green-600 font-semibold">• Preview Gratis</span>}
                    </div>
                  </div>
                </div>
                <Button variant="destructive" size="icon" onClick={() => handleDeleteModule(modul.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </GlassCard>
            ))
          )}
        </div>

        {/* Kolom Kanan: Form Tambah Modul */}
        <div>
          <GlassCard className="p-6 sticky top-24">
            <h2 className="text-lg font-bold text-[#00033D] mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#0033FF]" /> Tambah Modul Baru
            </h2>
            
            <form onSubmit={handleAddModule} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#00033D]">Judul Materi</label>
                <Input 
                  required 
                  placeholder="Contoh: Instalasi Framework" 
                  value={newModule.title}
                  onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#00033D]">URL Video (Opsional)</label>
                <Input 
                  placeholder="https://youtube.com/..." 
                  value={newModule.videoUrl}
                  onChange={(e) => setNewModule({...newModule, videoUrl: e.target.value})}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#00033D]">Konten Teks (Markdown/HTML)</label>
                <textarea 
                  rows={4}
                  className="w-full rounded-md border border-white/40 bg-white/50 px-3 py-2 text-sm text-[#00033D] placeholder:text-[#00033D]/40 focus:outline-none focus:ring-2 focus:ring-[#0033FF]/50"
                  placeholder="Tulis materi penjelasan di sini..."
                  value={newModule.content}
                  onChange={(e) => setNewModule({...newModule, content: e.target.value})}
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-[#00033D] cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-[#0033FF] focus:ring-[#0033FF]"
                  checked={newModule.isFreePreview}
                  onChange={(e) => setNewModule({...newModule, isFreePreview: e.target.checked})}
                />
                Jadikan Preview Gratis (Bisa dilihat tanpa beli)
              </label>

              <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
                {isSubmitting ? 'Menyimpan...' : 'Simpan Modul'}
              </Button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}