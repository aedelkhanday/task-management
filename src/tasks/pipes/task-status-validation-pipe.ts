import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isValidStatus(value)) {
      throw new BadRequestException(value + " is not a valid status");
    }
    return value;
  }

  private isValidStatus(status: any) {
    const retVal = this.allowedStatuses.indexOf(status);
    return retVal !== -1;
  }
}
