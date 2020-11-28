import { TaskStatus } from "../model/task.model";

export class GetTaskFilterDTO {
   status: TaskStatus;
   search: string;
}