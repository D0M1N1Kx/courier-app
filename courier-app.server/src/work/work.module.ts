import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Work } from '../entities/work.entity';
import { User } from '../entities/user.entity';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Work, User]),
        MulterModule.register(),
    ],
    controllers: [WorkController],
    providers: [WorkService],
})
export class WorkModule {}