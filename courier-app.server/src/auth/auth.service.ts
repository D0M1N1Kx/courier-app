import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Vehicle } from '../entities/vehicle.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>,
    ) {}

    async register(dto: RegisterDto) {
        const exists = await this.userRepo.findOne({ where: { email: dto.email } });
        if (exists) throw new ConflictException('This email is already registered!');

        const user = this.userRepo.create({
            email: dto.email,
            passwordHash: await bcrypt.hash(dto.password, 10),
            firstName: dto.firstName,
            lastName: dto.lastName,
        });

        await this.userRepo.save(user);
        return this.toResponse(user);
    }

    async login(dto: LoginDto) {
        const user = await this.userRepo.findOne({ where: { email: dto.email } });
        if (!user || !(await bcrypt.compare(dto.password, user.passwordHash)))
            throw new UnauthorizedException();
        return this.toResponse(user);
    }

    async getUser(userId: number) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found!');
        return this.toResponse(user);
    }

    async getUsers() {
        const users = await this.userRepo.find();
        return users.map(this.toResponse);
    }

    async assignVehicle(userId: number, vehicleId: string) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found!');
        const vehicle = await this.vehicleRepo.findOne({ where: { vehicleId } });
        if (!vehicle) throw new NotFoundException('Vehicle not found!');
        user.vehicleId = vehicleId;
        await this.userRepo.save(user);
    }

    async approveUser(userId: number, approve: boolean) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException();
        user.isApproved = approve;
        await this.userRepo.save(user);
    }

    private toResponse(user: User) {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            isApproved: user.isApproved,
            vehicleId: user.vehicleId,
        };
    }
}