import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filter.dto';
import { ValidatorTaskStatus } from './pipes/valitator-task-status.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
   constructor(private taskService: TasksService){}

   @Get()
   getAllTasks(@Query(ValidationPipe) filterDTO: GetTaskFilterDTO){
      return this.taskService.getTasks(filterDTO);
   }

   @Get(':id')
   getTaskById(@Param('id', ParseIntPipe) id: number):Promise<Task>{
      return this.taskService.getTaskById(id);
   }

   @Post()
   @UsePipes(ValidationPipe)
   createTask(@Body() createTaskDTO: TaskDTO):Promise<Task>{
      return this.taskService.createTask(createTaskDTO);
   }

   @Patch(':id')
   updateTaskStatus(
      @Param('id', ParseIntPipe) id: number, 
      @Body('status', ValidatorTaskStatus
   ) status: TaskStatus):Promise<Task>{
      return this.taskService.updateTaskStatus(id, status);
   }

   @Delete('/:id')
   deleteTask(@Param('id', ParseIntPipe) id: number):Promise<void>{
      return this.taskService.deleteTask(id);
   }
}
