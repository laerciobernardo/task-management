import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
   constructor(
      @InjectRepository(TaskRepository)
      private taskRepository: TaskRepository
   ){}

   getTasks(filterDTO: GetTaskFilterDTO): Promise<Task[]>{
      return this.taskRepository.getTasks(filterDTO);
   }

   async getTaskById(id: number):Promise<Task>{
      const found = await this.taskRepository.findOne(id);
      if(!found){
         throw new NotFoundException(`Task with ID "${id}" not found.`);
      }
      return found;
   }

   async createTask(createTaskDTO: TaskDTO):Promise<Task>{
      return this.taskRepository.createTask(createTaskDTO);
   }

   async updateTaskStatus(id: number, status:TaskStatus):Promise<Task>{
      let task = await this.getTaskById(id);
      task.status = status;
      await task.save();
      return task;
   }

   async deleteTask(id: number):Promise<void>{
      const founded = await this.getTaskById(id);
      this.taskRepository.delete(founded.id);
   }
}
