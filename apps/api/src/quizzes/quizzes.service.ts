import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async submitQuiz(userId: string, quizId: string, userAnswers: { questionId: string, answer: string }[]) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true }
    });

    if (!quiz) throw new NotFoundException('Kuis tidak ditemukan');

    // Cek batas percobaan
    const pastAttempts = await this.prisma.quizAttempt.count({
      where: { userId, quizId }
    });
    if (pastAttempts >= quiz.maxAttempts) {
      throw new BadRequestException('Batas maksimal percobaan kuis telah habis');
    }

    // Kalkulasi Skor
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      const answer = userAnswers.find(a => a.questionId === q.id);
      if (answer && answer.answer === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const isPassed = score >= quiz.passingGrade;

    // Simpan Percobaan
    const attempt = await this.prisma.quizAttempt.create({
      data: {
        quizId,
        userId,
        score,
        isPassed,
        attemptNumber: pastAttempts + 1
      }
    });

    let certificate = null;

    // Generate Sertifikat otomatis jika lulus dan belum punya
    if (isPassed) {
      const existingCert = await this.prisma.certificate.findFirst({
        where: { userId, classId: quiz.classId }
      });

      if (!existingCert) {
        // Generate kode verifikasi unik (8 karakter alphanumeric)
        const verificationCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        
        certificate = await this.prisma.certificate.create({
          data: {
            userId,
            classId: quiz.classId,
            verificationCode,
            status: 'VALID'
          }
        });
      } else {
        certificate = existingCert;
      }
    }

    return { attempt, certificate };
  }

  async createQuiz(instructorId: string, classId: string, data: any) {
    // Validasi kepemilikan kelas
    const course = await this.prisma.class.findFirst({
      where: { id: classId, instructorId }
    });
    if (!course) throw new BadRequestException('Akses ditolak atau kelas tidak ditemukan');

    // Hapus kuis lama jika ada (asumsi 1 kuis akhir per kelas)
    await this.prisma.quiz.deleteMany({ where: { classId, type: 'FINAL' } });

    return this.prisma.quiz.create({
      data: {
        classId,
        type: 'FINAL',
        passingGrade: Number(data.passingGrade),
        questions: {
          create: data.questions.map((q: any) => ({
            question: q.question,
            options: q.options, // Disimpan sebagai JSON array otomatis oleh Prisma
            correctAnswer: q.correctAnswer
          }))
        }
      }
    });
  }

  async getQuizForStudent(classId: string) {
    const quiz = await this.prisma.quiz.findFirst({
      where: { classId, type: 'FINAL' },
      select: {
        id: true,
        passingGrade: true,
        maxAttempts: true,
        questions: {
          select: { id: true, question: true, options: true } // Rahasiakan correctAnswer
        }
      }
    });

    if (!quiz) throw new NotFoundException('Kuis akhir belum tersedia untuk kelas ini');
    return quiz;
  }
}