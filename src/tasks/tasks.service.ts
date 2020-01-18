import { Injectable, Get, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./tasks.model";
import * as uuid from "uuid/v1";
import { CreateTaskDto } from "./dto/create-task-dto";
import { GetTaskFilterDto } from "./dto/get-task-filter-dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
    let { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(task => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  deleteTask(id: string): string {
    let deletedTask = this.getTaskById(id);
    this.tasks.filter((task, index) => {
      if (task.id === deletedTask.id) {
        this.tasks.splice(index, 1);
      }
    });
    return deletedTask.id;
  }

  updateTask(id: string, status: TaskStatus): Task {
    let task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    return task;
  }
}
