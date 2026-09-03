import { Controller, Post, Get, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  // 1. STATIC ROUTES (Harus diletakkan di atas)
  @Get('certificates/me')
  async getMyCertificates(@Request() req: any) {
    return this.enrollmentsService.getMyCertificates(req.user.id);
  }

  @Get('my')
  getMyEnrollments(@Request() req: any) {
    return this.enrollmentsService.getMyEnrollments(req.user.id);
  }

  @Get('payments/me')
  async getMyPayments(@Request() req: any) {
    return this.enrollmentsService.getMyPayments(req.user.id);
  }

  @Patch('payments/:id/proof')
  async uploadProof(@Param('id') id: string, @Body('proofUrl') proofUrl: string) {
    return this.enrollmentsService.uploadPaymentProof(id, proofUrl);
  }

  // 2. DYNAMIC ROUTES (Diletakkan di bawah)
  @Get('my/:classId')
  getEnrollmentDetails(@Param('classId') classId: string, @Request() req: any) {
    return this.enrollmentsService.getEnrollmentDetails(req.user.id, classId);
  }

  @Post(':classId')
  async enroll(@Param('classId') classId: string, @Request() req: any) {
    return this.enrollmentsService.enroll(req.user.id, classId);
  }

  @Patch(':enrollmentId/modules/:moduleId')
  updateProgress(
    @Param('enrollmentId') enrollmentId: string,
    @Param('moduleId') moduleId: string,
    @Body('status') status: 'IN_PROGRESS' | 'COMPLETED',
    @Request() req: any
  ) {
    return this.enrollmentsService.updateProgress(req.user.id, enrollmentId, moduleId, status);
  }
}