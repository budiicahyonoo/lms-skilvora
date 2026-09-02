import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async enroll(userId: string, classId: string) {
    // Cek apakah sudah pernah mendaftar
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: { userId_classId: { userId, classId } }
    });

    if (existingEnrollment) {
      throw new BadRequestException('Anda sudah terdaftar di kelas ini');
    }

    const course = await this.prisma.class.findUnique({
      where: { id: classId },
      include: { modules: true }
    });

    if (!course) throw new NotFoundException('Kelas tidak ditemukan');

    const isFree = Number(course.price) === 0;
    const status = isFree ? 'ACTIVE' : 'PENDING';

    // Buat enrollment dan inisialisasi progress untuk semua modul
    const enrollment = await this.prisma.enrollment.create({
      data: {
        userId,
        classId,
        status,
        progresses: {
          create: course.modules.map(modul => ({
            moduleId: modul.id,
            status: 'NOT_STARTED'
          }))
        }
      },
      include: { progresses: true }
    });

    return enrollment;
  }

  async getEnrollmentDetails(userId: string, classId: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_classId: { userId, classId } },
      include: {
        class: {
          include: { modules: { orderBy: { order: 'asc' } } }
        },
        progresses: true
      }
    });

    if (!enrollment) throw new NotFoundException('Anda belum terdaftar di kelas ini');
    return enrollment;
  }

  async updateProgress(userId: string, enrollmentId: string, moduleId: string, status: 'IN_PROGRESS' | 'COMPLETED') {
    // Validasi kepemilikan enrollment
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId, userId }
    });

    if (!enrollment) throw new UnauthorizedException('Akses ditolak');

    return this.prisma.moduleProgress.update({
      where: { enrollmentId_moduleId: { enrollmentId, moduleId } },
      data: {
        status,
        completedAt: status === 'COMPLETED' ? new Date() : null
      }
    });
  }

  async getMyEnrollments(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        class: { select: { title: true, slug: true, thumbnail: true } },
        progresses: true
      }
    });
  }
}