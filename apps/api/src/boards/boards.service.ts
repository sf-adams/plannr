import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board } from './board.schema';
import { Model, Types } from 'mongoose';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name)
    private boardModel: Model<Board>,
  ) {}

  async findUserBoards(userId: string): Promise<Board[]> {
    return this.boardModel
      .find({
        $or: [{ owner: userId }, { members: userId }],
      })
      .exec();
  }

  async createBoard(userId: string, dto: CreateBoardDto): Promise<Board> {
    const board = new this.boardModel({
      ...dto,
      owner: userId,
      members: [],
    });

    return board.save();
  }

  async addMember(
    boardId: string,
    currentUserId: string,
    memberIdToAdd: string,
  ): Promise<Board> {
    const board = await this.boardModel.findById(boardId);

    if (!board) throw new NotFoundException('Board not found');

    const ownerId = new Types.ObjectId(board.owner);
    const currentUserObjectId = new Types.ObjectId(currentUserId);

    if (!ownerId.equals(currentUserObjectId)) {
      throw new ForbiddenException('Only the board owner can add members');
    }

    const memberObjectId = new Types.ObjectId(memberIdToAdd);

    if (board.members.some((member) => member.equals(memberObjectId))) {
      return board;
    }

    board.members.push(memberObjectId);
    return board.save();
  }
}
