import { EntityRepository, Repository } from "typeorm";
import { TaskDTO } from "./dto/create-task.dto";
import { GetTaskFilterDTO } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

   async getTasks(filterDTO: GetTaskFilterDTO): Promise<Task[]>{
      const { status, search } = filterDTO;
      const query = this.createQueryBuilder('task');
   
      if(status){
         query.andWhere('task.status = :status', { status })
      }
      
      if(search){
         query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
      }

      const tasks = await query.getMany();

      return tasks;
   }

   async createTask(createTaskDTO: TaskDTO): Promise<Task>{
      const { title, description } = createTaskDTO;
      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = TaskStatus.OPEN;
      await task.save();

      return task;
   }
}