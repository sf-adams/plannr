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
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('lists')
@UseGuards(AuthGuard)
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  async createList(@Body() dto: CreateListDto) {
    return this.listsService.createList(dto);
  }

  @Patch(':id')
  async updateList(@Param('id') id: string, @Body() dto: UpdateListDto) {
    return this.listsService.updateList(id, dto);
  }

  @Delete(':id')
  async deleteList(@Param('id') id: string) {
    return this.listsService.deleteList(id);
  }

  @Get('board/:boardId')
  async getListsByBoard(@Param('boardId') boardId: string) {
    return this.listsService.findListsByBoard(boardId);
  }
}
