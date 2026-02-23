import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from '../entities/work.entity';
import { User } from '../entities/user.entity';
import { WorkStartDto } from './dto/work-start.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';

@Injectable()
export class WorkService {
    constructor(
        @InjectRepository(Work) private workRepo: Repository<Work>,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}

    async startWork(dto: WorkStartDto) {
        const user = await this.userRepo.findOne({ where: { id: dto.userId } });
        if (!user) throw new NotFoundException('User not found!');

        const work = this.workRepo.create({
            userId: dto.userId,
            packageCount: dto.packageCount,
            pricePerPackage: dto.pricePerPackage,
            startTime: new Date(),
        });

        await this.workRepo.save(work);
        return this.toResponse(work);
    }

    async completeWork(workId: number, file?: Express.Multer.File) {
      const work = await this.workRepo.findOne({ where: { id: workId } });
      if (!work) throw new NotFoundException('Work not found!');
      if (work.isCompleted) throw new ConflictException('Work already completed!');

      work.endTime = new Date();
      await this.workRepo.save(work);
      return this.toResponse(work);
    }
    async getUserWorks(userId: number) {
        const works = await this.workRepo.find({ where: { userId } });
        return works.map(this.toResponse);
    }

    private toResponse(work: Work) {
        return {
            id: work.id,
            userId: work.userId,
            packageCount: work.packageCount,
            pricePerPackage: work.pricePerPackage,
            totalEarned: work.packageCount * work.pricePerPackage,
            startTime: work.startTime,
            endTime: work.endTime,
            isCompleted: work.isCompleted,
            proofImagePath: work.proofImagePath,
        };
    }
}
