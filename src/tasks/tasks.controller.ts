import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./tasks.model";
import bodyParser = require("body-parser");
import { CreateTaskDto } from "./dto/create-task-dto";
import { GetTaskFilterDto } from "./dto/get-task-filter-dto";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilter(filterDto);
    } else return this.taskService.getAllTasks();
  }

  @Post("/createTask")
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): string {
    return this.taskService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTask(
    @Param("id") id: string,
    @Body("status") status: TaskStatus
  ): Task {
    console.log("Updating...");
    return this.taskService.updateTask(id, status);
  }
}
