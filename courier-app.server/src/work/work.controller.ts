import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { WorkService } from './work.service';
import { WorkStartDto } from './dto/work-start.dto';

@Controller('work')
export class WorkController {
  constructor(private workService: WorkService) {}

  @Post('start')
  start(@Body() dto: WorkStartDto) {
    return this.workService.startWork(dto);
  }

  @Post('complete/:workId')
  @UseInterceptors(FileInterceptor('proof'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        proof: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  complete(
    @Param('workId', ParseIntPipe) workId: number,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.workService.completeWork(workId, file);
  }

  @Get('user/:userId')
  getUserWorks(@Param('userId', ParseIntPipe) userId: number) {
    return this.workService.getUserWorks(userId);
  }
}
