'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Users, ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { CourseService } from "@/services/course.service";
import { PublicLayout } from "@/components/layouts/public-layout";

export default function CatalogPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    CourseService.getAllPublished()
      .then(setCourses)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <PublicLayout>
      <div className="bg-gradient-to-b from-[#EAEDFB]/40 to-[#FAFAFA] py-16 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#0033FF]/10 text-[#0033FF] text-xs font-bold tracking-widest uppercase mb-4 border border-[#0033FF]/20 shadow-sm">
              Katalog Pembelajaran
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#00033D] tracking-tight mb-4">
              Jelajahi Berbagai Kelas Pilihan
            </h1>
            <p className="text-[#00033D]/70 text-lg leading-relaxed">
              Tingkatkan keahlian teknologi Anda dengan materi terstruktur dari praktisi industri terbaik. Temukan kelas yang sesuai untuk percepatan karir Anda.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-white/60 h-96 rounded-3xl border border-gray-100 shadow-sm"></div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            <GlassCard className="p-16 text-center max-w-xl mx-auto bg-white/80 rounded-3xl shadow-xl">
              <div className="w-16 h-16 bg-[#0033FF]/10 text-[#0033FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#00033D] mb-2">Belum Ada Kelas Tersedia</h3>
              <p className="text-[#00033D]/60 text-sm">Saat ini belum ada kelas yang dipublikasikan. Silakan periksa kembali beberapa saat lagi.</p>
            </GlassCard>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <GlassCard key={course.id} className="p-0 overflow-hidden flex flex-col bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
                  {/* Thumbnail Container */}
                  <div className="h-52 bg-[#EAEDFB] relative overflow-hidden">
                    {course.thumbnail ? (
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#00033D]/30 font-semibold bg-gradient-to-br from-gray-100 to-gray-200">
                        Skilvora Academy
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0033FF] shadow-md border border-white/40">
                      {course.category?.name || 'Umum'}
                    </div>
                    {course.level && (
                      <div className="absolute top-4 right-4 bg-[#00033D]/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-md">
                        {course.level}
                      </div>
                    )}
                  </div>
                  
                  {/* Content Container */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#00033D] mb-3 line-clamp-2 hover:text-[#0033FF] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-[#00033D]/60 mb-6 line-clamp-2 leading-relaxed">
                        {course.description || 'Pelajari materi mendalam dan studi kasus nyata langsung dari para ahli di bidangnya.'}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-4 text-xs font-semibold text-[#00033D]/60 mb-6 pt-4 border-t border-gray-100">
                        <span className="flex items-center gap-1.5 bg-[#EAEDFB]/50 px-2.5 py-1 rounded-lg">
                          <BookOpen className="w-4 h-4 text-[#0033FF]" /> {course._count?.modules || 0} Modul
                        </span>
                        <span className="flex items-center gap-1.5 bg-[#EAEDFB]/50 px-2.5 py-1 rounded-lg">
                          <Users className="w-4 h-4 text-[#0033FF]" /> {course._count?.enrollments || 0} Siswa
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <span className="text-xs text-[#00033D]/40 block font-medium">Investasi Kelas</span>
                          <span className="font-extrabold text-lg text-[#0033FF]">
                            {Number(course.price) === 0 ? 'GRATIS' : `Rp ${Number(course.price).toLocaleString('id-ID')}`}
                          </span>
                        </div>
                        <Button asChild className="bg-[#0033FF] hover:bg-[#0029CC] text-white font-bold px-5 rounded-xl shadow-md transition-transform hover:scale-105">
                          <Link href={`/courses/${course.slug}`} className="gap-2">
                            Detail <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}