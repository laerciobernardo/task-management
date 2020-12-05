import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './model/task.model';
import { ValidatorTaskStatus } from './pipes/valitator-task-status.pipe';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
   constructor(private taskService: TasksService){}

   @Get()
   getAllTasks(@Query(ValidationPipe) filterDTO: GetTaskFilterDTO):Task[]{
      if(Object.keys(filterDTO).length){
         return this.taskService.getTaskBySearch(filterDTO);
      }else{
         return this.taskService.getAllTasks();
      }
   }

   @Get(':id')
   getTaskById(@Param('id') id: string):Task{
      return this.taskService.getTaskById(id);
   }

   @Post()
   @UsePipes(ValidationPipe)
   createTask(@Body() createTaskDTO: TaskDTO):Task{
      return this.taskService.createTask(createTaskDTO);
   }

   @Patch(':id')
   updateTaskStatus(@Param('id') id: string, @Body('status', ValidatorTaskStatus) status: TaskStatus):Task{
      return this.taskService.updateTaskStatus(id, status);
   }

   @Delete(':id')
   deleteTask(@Param('id') id: string):void{
      this.taskService.deleteTask(id);
   }
}
