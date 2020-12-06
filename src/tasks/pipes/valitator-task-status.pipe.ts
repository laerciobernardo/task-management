import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class ValidatorTaskStatus implements PipeTransform{
   readonly allowedStatus = Object.values(TaskStatus);

   _isValidStatus(status):Boolean{
      const idx = this.allowedStatus.indexOf(status);
      return idx !== -1;
   }

   transform(value: any, metadata: any){
      value = value.toUpperCase();
      if(!this._isValidStatus(value)){
         throw new BadRequestException(`The status ${value} is not valid.`)
      }
      
      return value;
   }
   
}