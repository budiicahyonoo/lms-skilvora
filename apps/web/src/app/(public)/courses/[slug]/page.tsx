import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { EnrollButton } from "@/components/courses/enroll-button";

// Fungsi fetch langsung untuk Server Component agar mendukung caching & SEO ISR
async function getCourseData(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}`, { 
    next: { revalidate: 3600 } // Incremental Static Regeneration (ISR) tiap 1 jam
  });
  if (!res.ok) return null;
  return res.json();
}

// Generate Meta Tags dinamis untuk SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata | null> {
  // Await params terlebih dahulu untuk Next.js 15+
  const resolvedParams = await params;
  const course = await getCourseData(resolvedParams.slug);
  
  if (!course) return { title: 'Kelas Tidak Ditemukan - Skilvora' };

  return {
    title: `${course.title} - Skilvora`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params terlebih dahulu untuk Next.js 15+
  const resolvedParams = await params;
  const course = await getCourseData(resolvedParams.slug);

  if (!course) {
    notFound();
  }

  const isFree = Number(course.price) === 0;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Kolom Kiri: Info & Modul */}
        <div className="flex-1">
          <div className="mb-8">
            <Badge className="mb-4">{course.category?.name || 'Umum'}</Badge>
            <h1 className="text-4xl font-bold text-[#00033D] mb-4">{course.title}</h1>
            <p className="text-lg text-[#00033D]/70">{course.description}</p>
            <p className="text-sm font-medium mt-4 text-[#0033FF]">
              Instruktur: {course.instructor?.name}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#00033D] mb-4">Materi Pembelajaran</h2>
          <div className="flex flex-col gap-3">
            {course.modules?.map((modul: any) => (
              <GlassCard key={modul.id} className="p-4 flex items-center justify-between hover:bg-white/40">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#EAEDFB] flex items-center justify-center text-sm font-bold text-[#00033D]/50">
                    {modul.order}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#00033D]">{modul.title}</h4>
                  </div>
                </div>
                {modul.isFreePreview && (
                  <Badge variant="success">Preview Gratis</Badge>
                )}
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Panel Pendaftaran (Sticky) */}
        <div className="w-full lg:w-[380px]">
          <div className="sticky top-24">
            <GlassCard className="p-6">
              <div className="h-48 rounded-xl bg-[#EAEDFB]/50 border border-white/20 mb-6 flex items-center justify-center overflow-hidden">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-[#00033D]/40 font-medium">Thumbnail Kelas</span>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-[#0033FF] mb-1">
                  {isFree ? 'Gratis' : `Rp ${Number(course.price).toLocaleString('id-ID')}`}
                </h3>
                <p className="text-sm text-[#00033D]/60">Akses kelas selamanya</p>
              </div>

              {/* Tombol Pendaftaran Interaktif */}
              <EnrollButton classId={course.id} isFree={isFree} />
              
              <ul className="text-sm text-[#00033D]/70 space-y-2 mt-6 border-t border-white/20 pt-4">
                <li className="flex items-center gap-2">✓ {course.modules?.length || 0} Modul Pembelajaran</li>
                <li className="flex items-center gap-2">✓ Akses Materi Seumur Hidup</li>
                <li className="flex items-center gap-2">✓ Evaluasi Kuis Akhir</li>
                <li className="flex items-center gap-2">✓ Sertifikat Digital Kelulusan</li>
              </ul>
            </GlassCard>
          </div>
        </div>

      </div>
    </div>
  )
}