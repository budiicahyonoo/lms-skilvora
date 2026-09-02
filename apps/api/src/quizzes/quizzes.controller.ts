import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  // Endpoint Publik (Tanpa Auth Guard)
  @Get('verify-certificate/:code')
  verifyCertificate(@Param('code') code: string) {
    return this.quizzesService.verifyCertificate(code);
  }

  // Endpoint Siswa (Dengan Auth Guard)
  @UseGuards(AuthGuard('jwt'))
  @Post(':quizId/submit')
  submitQuiz(
    @Param('quizId') quizId: string,
    @Body('answers') answers: Record<string, string>,
    @Request() req: any
  ) {
    return this.quizzesService.submitQuiz(req.user.id, quizId, answers);
  }
}