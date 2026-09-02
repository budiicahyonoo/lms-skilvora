import { Controller, Get, Param } from '@nestjs/common';
import { RoadmapsService } from './roadmaps.service';

@Controller('roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  @Get()
  findAll() {
    return this.roadmapsService.findAllPublished();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.roadmapsService.findBySlug(slug);
  }
}