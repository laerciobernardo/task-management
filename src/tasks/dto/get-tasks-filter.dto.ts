import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../model/task.model";

export class GetTaskFilterDTO{
   @IsOptional()
   @IsIn(Object.values(TaskStatus))
   status: TaskStatus;
   
   @IsOptional()
   @IsNotEmpty()
   search: string;
}