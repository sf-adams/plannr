import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('cards')
@UseGuards(AuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async createCard(@Body() dto: CreateCardDto) {
    return this.cardsService.createCard(dto);
  }

  @Patch(':id')
  async updateCard(@Param('id') id: string, @Body() dto: UpdateCardDto) {
    return this.cardsService.updateCard(id, dto);
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: string) {
    return this.cardsService.deleteCard(id);
  }

  @Get('list/:listId')
  async getCardsByList(@Param('listId') listId: string) {
    return this.cardsService.findCardsByList(listId);
  }
}
