import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(taskData: Partial<Task>): Promise<Task> {
    const task = new this.taskModel(taskData);
    return task.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: string, updateData: Partial<Task>): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async delete(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Task not found');
    }
  }
}
