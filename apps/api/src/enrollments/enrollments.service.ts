import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async enroll(userId: string, classId: string) {
    // 1. Cek validasi kelas
    const course = await this.prisma.class.findUnique({ where: { id: classId } });
    if (!course) throw new NotFoundException('Kelas tidak ditemukan');

    // 2. Cegah pendaftaran ganda
    const existing = await this.prisma.enrollment.findUnique({
      where: { userId_classId: { userId, classId } }
    });
    if (existing) throw new BadRequestException('Anda sudah terdaftar di kelas ini');

    const isFree = Number(course.price) === 0;

    // 3. Buat Enrollment (ACTIVE jika gratis, PENDING jika berbayar)
    const enrollment = await this.prisma.enrollment.create({
      data: {
        userId,
        classId,
        status: isFree ? 'ACTIVE' : 'PENDING'
      }
    });

    // 4. Generate Tagihan Pembayaran jika kelas berbayar
    if (!isFree) {
      await this.prisma.payment.create({
        data: {
          enrollmentId: enrollment.id,
          amount: course.price,
          method: 'MANUAL_TRANSFER',
          status: 'PENDING'
        }
      });
    }

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

  async getMyCertificates(userId: string) {
    return this.prisma.certificate.findMany({
      where: { userId },
      include: { 
        class: { select: { title: true, thumbnail: true } } 
      },
      orderBy: { issuedAt: 'desc' }
    });
  }

  async getMyPayments(userId: string) {
    return this.prisma.payment.findMany({
      where: {
        enrollment: { userId }
      },
      include: {
        enrollment: {
          include: {
            class: { select: { title: true, price: true, thumbnail: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async uploadPaymentProof(paymentId: string, proofUrl: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { enrollment: true }
    });

    if (!payment) throw new NotFoundException('Tagihan tidak ditemukan');

    const updatedPayment = await this.prisma.payment.update({
      where: { id: paymentId },
      data: { 
        proofUrl, 
        status: 'PENDING' 
      }
    });

    return updatedPayment;
  }
}