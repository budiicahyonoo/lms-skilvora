'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { InstructorService } from "@/services/instructor.service";

export default function ManageClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    InstructorService.getMyClasses()
      .then(setClasses)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#00033D] mb-2">Manajemen Kelas</h1>
          <p className="text-[#00033D]/70">Kelola materi pembelajaran, kuis, dan pantau siswa Anda.</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/manage-classes/create">
            <Plus className="w-4 h-4" /> Buat Kelas Baru
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-[#EAEDFB]/50 rounded-2xl"></div>)}
        </div>
      ) : classes.length === 0 ? (
        <GlassCard className="p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-[#EAEDFB] rounded-full flex items-center justify-center mb-4 text-[#0033FF]">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#00033D] mb-2">Belum ada kelas</h3>
          <p className="text-[#00033D]/60 mb-6 max-w-md">Anda belum membuat kelas apa pun. Mulai bagikan keahlian Anda dengan membuat kelas pertama sekarang.</p>
          <Button asChild>
            <Link href="/dashboard/manage-classes/create">Buat Kelas Pertama</Link>
          </Button>
        </GlassCard>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((course) => (
            <GlassCard key={course.id} className="p-0 overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              <div className="h-40 bg-[#EAEDFB] relative">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#00033D]/30 font-medium">
                    Tanpa Thumbnail
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge variant={course.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-[#00033D] mb-4 line-clamp-2">{course.title}</h3>
                
                <div className="flex items-center gap-4 mt-auto mb-6">
                  <div className="flex items-center gap-1.5 text-sm text-[#00033D]/60">
                    <BookOpen className="w-4 h-4" /> {course._count?.modules || 0} Modul
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-[#00033D]/60">
                    <Users className="w-4 h-4" /> {course._count?.enrollments || 0} Siswa
                  </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/dashboard/manage-classes/${course.id}`}>Kelola Konten</Link>
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}