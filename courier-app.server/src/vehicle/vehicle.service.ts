import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vehicle } from "../entities/vehicle.entity";

@Injectable()
export class VehicleService {
    constructor(@InjectRepository(Vehicle) private repo: Repository<Vehicle>) {}
    
    async add(dto: any) {
        const exists = await this.repo.findOne({ where: { vehicleId: dto.vehicleId } });
        if (exists) throw new ConflictException('Vehicle already exists!');
        const vehicle = this.repo.create(dto);
        return this.repo.save(vehicle);
    }

    async findOne(vehicleId: string) {
        const v = await this.repo.findOne({ where: { vehicleId } });
        if (!v) throw new NotFoundException();
        return v;
    }

    findAll() {
        return this.repo.find();
    }
}