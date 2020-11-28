import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './model/task.model';
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class TasksService {
   private _tasks: Task[] = [];

   getAllTasks(){
      return this._tasks;
   }

   getTaskBySearch(GetTaskFilterDTO): Tasks[]{
      const allTasks = this.getAllTasks();
      let tasks = null;
      if(status.length){
         tasks = allTasks.filter(task => task.status === status);
      }
      if(search.length){
         tasks = allTasks.filter(task => task.title.includes(search) || task.description.includes(search))
      }
      return tasks;
   }

   getTaskById(id: string):Task{
      return this._tasks.filter(task => task.id === id)[0];
   }

   createTask(TaskDTO): Task{
      const {title, description } = TaskDTO;

      const newTask = {
         id: uuidv1(),
         title,
         description,
         status: TaskStatus.OPEN
      }
      this._tasks.push(newTask);
      return newTask;
   }

   updateTaskStatus(id: string, status:TaskStatus):Task{
      let task = this.getTaskById(id);
      task.status = status;
      return task;
   }

   deleteTask(id: string):void{
      this._tasks = this._tasks.filter(task => task.id !== id);
   }
}