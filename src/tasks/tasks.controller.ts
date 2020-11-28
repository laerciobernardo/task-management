import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './model/task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
   constructor(private taskService: TasksService){}

   @Get()
   getAllTasks():Task[]{
      return this.taskService.getAllTasks();
   }

   @Get(':id')
   getTaskById(@Param('id') id: string):Task{
      return this.taskService.getTaskById(id);
   }

   @Post()
   createTask(@Body() createTaskDTO: TaskDTO):Task{
      return this.taskService.createTask(createTaskDTO);
   }

   @Patch(':id')
   updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus):Task{
      return this.taskService.updateTaskStatus(id, status);
   }

   @Delete(':id')
   deleteTask(@Param('id') id: string):void{
      this.taskService.deleteTask(id);
   }
}
