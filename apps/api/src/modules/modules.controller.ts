import { Controller, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post('class/:classId')
  create(@Param('classId') classId: string, @Body() createModuleDto: any, @Request() req: any) {
    return this.modulesService.create(classId, req.user.id, createModuleDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: any, @Request() req: any) {
    return this.modulesService.update(id, req.user.id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.modulesService.remove(id, req.user.id);
  }
}