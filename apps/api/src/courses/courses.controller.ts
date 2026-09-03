import { Controller, Get, Param, Post, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // ==========================================
  // 1. STATIC ROUTES (Harus diletakkan di atas)
  // ==========================================

  @Get()
  async findAll() {
    return this.coursesService.findAllPublished();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('instructor/my-classes')
  async getInstructorClasses(@Request() req: any) {
    return this.coursesService.findInstructorClasses(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('instructor/classes')
  async createClass(@Request() req: any, @Body() data: any) {
    return this.coursesService.create(req.user.id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('instructor/classes/:id')
  async getInstructorClassById(@Param('id') id: string, @Request() req: any) {
    return this.coursesService.findInstructorClassById(id, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('instructor/classes/:id/publish')
  async publishClass(@Param('id') id: string, @Request() req: any) {
    return this.coursesService.publishClass(id, req.user.id);
  }

  // ==========================================
  // 2. DYNAMIC ROUTES (Harus diletakkan di bawah)
  // ==========================================

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.coursesService.findBySlug(slug);
  }
}