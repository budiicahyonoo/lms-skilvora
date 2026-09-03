import { Controller, Post, Body, Param, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':quizId/submit')
  async submitAttempt(
    @Param('quizId') quizId: string,
    @Request() req: any,
    @Body('answers') answers: { questionId: string, answer: string }[]
  ) {
    return this.quizzesService.submitQuiz(req.user.id, quizId, answers);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('instructor/class/:classId')
  async createClassQuiz(
    @Param('classId') classId: string,
    @Request() req: any,
    @Body() data: any
  ) {
    return this.quizzesService.createQuiz(req.user.id, classId, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('class/:classId')
  async getStudentQuiz(@Param('classId') classId: string) {
    return this.quizzesService.getQuizForStudent(classId);
  }
}