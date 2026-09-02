import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"

// Mockup data untuk UI MVP
const MOCK_COURSES = [
  { slug: "html-css-dasar", title: "HTML & CSS Dasar untuk Pemula", category: "Frontend", level: "Beginner", price: "Gratis" },
  { slug: "javascript-dom", title: "JavaScript & Manipulasi DOM", category: "Frontend", level: "Intermediate", price: "Rp 149.000" },
  { slug: "backend-nodejs", title: "Backend Development dengan Node.js", category: "Backend", level: "Intermediate", price: "Rp 199.000" },
]

export default function CoursesCatalogPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#00033D] mb-4">Katalog Kelas</h1>
        <p className="text-[#00033D]/70">Pilih kelas satuan atau ikuti roadmap untuk jalur belajar yang terarah.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COURSES.map((course) => (
          <Link href={`/courses/${course.slug}`} key={course.slug}>
            <GlassCard className="overflow-hidden group h-full flex flex-col cursor-pointer hover:border-[#977DFF]/50 hover:bg-white/40">
              {/* Thumbnail Placeholder */}
              <div className="h-40 bg-[#EAEDFB]/50 border-b border-white/20 flex items-center justify-center relative overflow-hidden">
                <span className="text-[#00033D]/30 font-medium">Thumbnail Image</span>
                {/* Subtle gradient overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="default">{course.category}</Badge>
                  <span className="text-xs font-semibold text-[#00033D]/60 uppercase tracking-wider">{course.level}</span>
                </div>
                <h3 className="text-lg font-bold text-[#00033D] mb-2 group-hover:text-[#0033FF] transition-colors">{course.title}</h3>
                
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/20">
                  <span className="font-bold text-[#0033FF]">
                    {course.price}
                  </span>
                  <span className="text-sm font-medium text-[#00033D]/70 group-hover:text-[#0033FF] transition-colors">Lihat Detail →</span>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  )
}