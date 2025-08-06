import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Card } from './card.schema';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}

  async createCard(dto: CreateCardDto): Promise<Card> {
    // If order not provided, calculate max order + 1 for the list
    let order = dto.order;
    if (order === undefined) {
      const maxCard = await this.cardModel
        .findOne({ list: dto.listId })
        .sort('-order')
        .exec();
      order = maxCard ? maxCard.order + 1 : 0;
    }

    const card = new this.cardModel({
      title: dto.title,
      description: dto.description,
      list: new Types.ObjectId(dto.listId),
      order,
    });
    return card.save();
  }

  async updateCard(id: string, dto: UpdateCardDto): Promise<Card> {
    const updated = await this.cardModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Card not found');
    return updated;
  }

  async deleteCard(id: string): Promise<void> {
    const result = await this.cardModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Card not found');
  }

  async findCardsByList(listId: string): Promise<Card[]> {
    const objectId = new Types.ObjectId(listId);
    return this.cardModel.find({ list: objectId }).exec();
  }

  async moveCard(
    cardId: string,
    toListId: string,
    order: number,
  ): Promise<Card> {
    const updated = await this.cardModel.findByIdAndUpdate(
      cardId,
      {
        list: new Types.ObjectId(toListId),
        order,
      },
      { new: true },
    );

    if (!updated) throw new NotFoundException('Card not found');
    return updated;
  }
}
