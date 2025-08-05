import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateBoardDto } from './dto/create-board.dto';
import { AddMemberDto } from './dto/add-member.dto';
import type { RequestWithUser } from 'src/types/request-with-user';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getMyBoards(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return this.boardsService.findUserBoards(userId);
  }

  @Post()
  async createBoard(@Req() req: RequestWithUser, @Body() dto: CreateBoardDto) {
    const userId = req.user.sub;
    const board = this.boardsService.createBoard(userId, dto);
    return board;
  }

  @Post(':id/members')
  async addMember(
    @Req() req: RequestWithUser,
    @Param('id') boardId: string,
    @Body() dto: AddMemberDto,
  ) {
    const currentUserId = req.user.sub;
    return this.boardsService.addMember(boardId, currentUserId, dto.userId);
  }
}
