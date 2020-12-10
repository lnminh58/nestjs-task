import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { title } from 'process';
import { CreatTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { EnumValueValidation } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskSerivce: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    return this.taskSerivce.getTasksWithFilter(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskSerivce.getTaskById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreatTaskDto): Task {
    return this.taskSerivce.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.taskSerivce.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', new EnumValueValidation(TaskStatus)) status: TaskStatus,
  ): Task {
    return this.taskSerivce.updateTaskStatus(id, status);
  }
}
