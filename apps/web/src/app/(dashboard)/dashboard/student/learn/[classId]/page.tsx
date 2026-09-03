'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, Award } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { EnrollmentService } from "@/services/enrollment.service";

export default function LearningRoomPage() {
  const params = useParams();
  const classId = params.classId as string;
  
  const [data, setData] = useState<any>(null);
  const [activeModule, setActiveModule] = useState<any>(null); // Jika string 'QUIZ', tampilkan kuis
  const [isLoading, setIsLoading] = useState(true);

  // State Kuis
  const [quizData, setQuizData] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [quizError, setQuizError] = useState(false);

  const fetchDetails = async () => {
    try {
      const res = await EnrollmentService.getEnrollmentDetails(classId);
      setData(res);
      if (res.class.modules.length > 0 && !activeModule) {
        setActiveModule(res.class.modules[0]);
      }
    } catch (error) {
      toast.error("Gagal memuat ruang belajar");
    } finally {
      setIsLoading(false);
    }
  };

  // const loadQuiz = async () => {
  //   try {
  //     const qData = await EnrollmentService.getQuiz(classId);
  //     setQuizData(qData);
  //   } catch (error) {
  //     toast.error("Kuis belum tersedia");
  //   }
  // };
  const loadQuiz = async () => {
    try {
      const qData = await EnrollmentService.getQuiz(classId);
      setQuizData(qData);
      setQuizError(false);
    } catch (error) {
      toast.error("Kuis belum tersedia");
      setQuizError(true); // Beritahu UI bahwa kuis gagal dimuat
    }
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  // Efek memuat data kuis saat tab Kuis dipilih
  useEffect(() => {
    if (activeModule === 'QUIZ' && !quizData) {
      loadQuiz();
    }
  }, [activeModule]);

  const handleMarkComplete = async () => {
    if (!activeModule || !data || activeModule === 'QUIZ') return;
    try {
      await EnrollmentService.updateProgress(data.id, activeModule.id, 'COMPLETED');
      toast.success("Modul diselesaikan!");
      fetchDetails(); 
    } catch (error) {
      toast.error("Gagal memperbarui progres");
    }
  };

  const handleSubmitQuiz = async () => {
    if (!quizData) return;
    
    // Format jawaban untuk backend: [{ questionId: '...', answer: 'A' }, ...]
    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      questionId, answer
    }));

    setIsSubmittingQuiz(true);
    try {
      const res = await EnrollmentService.submitQuiz(quizData.id, formattedAnswers);
      setQuizResult(res);
      if (res.attempt.isPassed) {
        toast.success("Selamat! Anda Lulus!");
      } else {
        toast.error("Maaf, Anda belum lulus. Coba lagi.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal mengirim kuis");
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  if (isLoading) return <div className="animate-pulse bg-[#EAEDFB] h-[calc(100vh-6rem)] rounded-xl"></div>;
  if (!data) return <div>Data tidak ditemukan.</div>;

  const isCompleted = (moduleId: string) => {
    const prog = data.progresses.find((p: any) => p.moduleId === moduleId);
    return prog?.status === 'COMPLETED';
  };

  // Logika Render Konten Utama
  const renderMainContent = () => {
    if (activeModule === 'QUIZ') {
      if (quizError) return <div className="p-8 text-center text-red-500 font-bold">Kuis belum dibuat oleh instruktur.</div>;
      if (!quizData) return <div className="p-8 text-center text-[#00033D]/60">Memuat Kuis...</div>;
      
      // Jika kuis sudah disubmit dan ada hasil
      if (quizResult) {
        return (
          <div className="max-w-2xl mx-auto w-full text-center py-12">
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 ${quizResult.attempt.isPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              <Award className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold text-[#00033D] mb-2">Skor Anda: {quizResult.attempt.score}</h1>
            <p className="text-[#00033D]/70 mb-8">
              {quizResult.attempt.isPassed 
                ? "Selamat! Anda telah menyelesaikan kelas ini dan berhak mendapatkan sertifikat." 
                : `Nilai minimum kelulusan adalah ${quizData.passingGrade}. Silakan pelajari ulang materi dan coba lagi.`}
            </p>
            {quizResult.certificate && (
              <GlassCard className="p-6 bg-[#0033FF]/5 border border-[#0033FF]/20 text-left mb-6">
                <p className="text-sm font-semibold text-[#00033D]/60 uppercase tracking-wider mb-1">Kode Sertifikat Valid</p>
                <p className="text-xl font-bold text-[#0033FF]">{quizResult.certificate.verificationCode}</p>
              </GlassCard>
            )}
            <Button onClick={() => setQuizResult(null)} variant="secondary" className="mr-4">Tutup Hasil</Button>
          </div>
        );
      }

      // Halaman Pengerjaan Kuis
      return (
        <div className="max-w-3xl mx-auto w-full pb-12">
          <h1 className="text-3xl font-bold text-[#00033D] mb-2">Kuis Akhir Evaluasi</h1>
          <p className="text-[#00033D]/70 mb-8">Passing Grade: {quizData.passingGrade}%</p>
          
          <div className="space-y-8">
            {quizData.questions.map((q: any, i: number) => (
              <GlassCard key={q.id} className="p-6">
                <h3 className="font-bold text-[#00033D] mb-4">{i + 1}. {q.question}</h3>
                <div className="space-y-3">
                  {q.options.map((opt: any) => (
                    <label key={opt.id} className="flex items-center gap-3 p-3 rounded-lg border border-white/40 hover:bg-white/50 cursor-pointer transition-colors">
                      <input 
                        type="radio" 
                        name={`question-${q.id}`} 
                        className="text-[#0033FF] focus:ring-[#0033FF]"
                        checked={answers[q.id] === opt.id}
                        onChange={() => setAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                      />
                      <span className="font-semibold text-[#00033D] w-6">{opt.id}.</span>
                      <span className="text-[#00033D]">{opt.text}</span>
                    </label>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 flex justify-end">
             <Button onClick={handleSubmitQuiz} disabled={isSubmittingQuiz || Object.keys(answers).length !== quizData.questions.length}>
               {isSubmittingQuiz ? 'Memproses...' : 'Kirim Jawaban'}
             </Button>
          </div>
        </div>
      );
    }

    // Default: Tampilan Modul (Materi)
    return activeModule ? (
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-[#00033D] mb-6">{activeModule.title}</h1>
        
        {activeModule.videoUrl && (
          <div className="aspect-video bg-black rounded-xl mb-8 overflow-hidden">
            <iframe className="w-full h-full" src={activeModule.videoUrl.replace("watch?v=", "embed/")} allowFullScreen></iframe>
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
    ) : null;
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6">
      {/* Sidebar Kiri */}
      <GlassCard className="w-80 p-0 flex flex-col overflow-hidden shrink-0">
        <div className="p-4 border-b border-white/20 bg-white/30">
          <Link href="/dashboard/student/classes" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00033D]/70 hover:text-[#0033FF] mb-4">
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

        {/* Tombol Kuis Akhir di Bottom Sidebar */}
        <div className="p-4 border-t border-white/20 bg-white/40">
           <button
             onClick={() => setActiveModule('QUIZ')}
             className={`w-full text-left p-3 rounded-lg flex gap-3 items-center transition-colors font-bold ${activeModule === 'QUIZ' ? 'bg-[#0033FF] text-white shadow-md' : 'bg-white/50 text-[#00033D] hover:bg-white'}`}
           >
             <Award className="w-5 h-5 shrink-0" />
             Kuis Akhir & Sertifikat
           </button>
        </div>
      </GlassCard>

      {/* Area Konten Kanan */}
      <GlassCard className="flex-1 p-8 overflow-y-auto flex flex-col">
        {renderMainContent()}
      </GlassCard>
    </div>
  );
}