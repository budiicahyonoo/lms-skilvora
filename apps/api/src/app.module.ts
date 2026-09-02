import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module'; 
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { RoadmapsModule } from './roadmaps/roadmaps.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, 
    PrismaModule, 
    UsersModule,
    CoursesModule,
    ModulesModule,
    RoadmapsModule,
    EnrollmentsModule,
    QuizzesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}