import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { List } from './list.schema';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListsService {
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}

  async createList(dto: CreateListDto): Promise<List> {
    const list = new this.listModel({
      title: dto.title,
      board: new Types.ObjectId(dto.boardId),
    });
    return list.save();
  }

  async updateList(id: string, dto: UpdateListDto): Promise<List> {
    const updated = await this.listModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('List not found');
    return updated;
  }

  async deleteList(id: string): Promise<void> {
    const result = await this.listModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('List not found');
  }

  async findListsByBoard(boardId: string): Promise<List[]> {
    const objectId = new Types.ObjectId(boardId);
    return this.listModel.find({ board: objectId }).exec();
  }
}
