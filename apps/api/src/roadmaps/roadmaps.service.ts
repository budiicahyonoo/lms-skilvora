import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoadmapsService {
  constructor(private prisma: PrismaService) {}

  async findAllPublished() {
    return this.prisma.roadmap.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        nodes: {
          orderBy: { order: 'asc' },
          include: {
            class: {
              select: { id: true, title: true, slug: true, level: true, thumbnail: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const roadmap = await this.prisma.roadmap.findUnique({
      where: { slug, status: 'PUBLISHED' },
      include: {
        nodes: {
          orderBy: { order: 'asc' },
          include: {
            class: {
              select: { id: true, title: true, slug: true, level: true, thumbnail: true, description: true }
            }
          }
        }
      }
    });

    if (!roadmap) throw new NotFoundException('Roadmap tidak ditemukan');
    return roadmap;
  }
}