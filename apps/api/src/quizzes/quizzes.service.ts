import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async submitQuiz(userId: string, quizId: string, studentAnswers: Record<string, string>) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true }
    });

    if (!quiz) throw new NotFoundException('Kuis tidak ditemukan');

    // Cek batas percobaan (max attempts)
    const attemptsCount = await this.prisma.quizAttempt.count({
      where: { userId, quizId }
    });

    if (attemptsCount >= quiz.maxAttempts) {
      throw new BadRequestException('Batas percobaan kuis telah habis');
    }

    // Kalkulasi skor
    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (studentAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const isPassed = score >= quiz.passingGrade;

    // Simpan Attempt
    const attempt = await this.prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
        score,
        isPassed,
        attemptNumber: attemptsCount + 1
      }
    });

    // Generate Sertifikat jika lulus & ini adalah kuis akhir (FINAL)
    if (isPassed && quiz.type === 'FINAL') {
      const existingCert = await this.prisma.certificate.findFirst({
        where: { userId, classId: quiz.classId }
      });

      if (!existingCert) {
        const verificationCode = randomBytes(4).toString('hex').toUpperCase(); // Generate 8 karakter kode
        await this.prisma.certificate.create({
          data: {
            userId,
            classId: quiz.classId,
            verificationCode
          }
        });
      }
    }

    return attempt;
  }

  // Publik Endpoint untuk Verifikasi HR / Rekrutmen
  async verifyCertificate(code: string) {
    const certificate = await this.prisma.certificate.findUnique({
      where: { verificationCode: code },
      include: {
        user: { select: { name: true } },
        class: { select: { title: true, instructor: { select: { name: true } } } }
      }
    });

    if (!certificate) throw new NotFoundException('Sertifikat tidak valid atau tidak ditemukan');
    return certificate;
  }
}