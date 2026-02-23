import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { VehicleService } from "./vehicle.service";

@Controller('vehicles')
export class VehicleController {
    constructor(private vehicleService: VehicleService) {}

    @Post('add')
    add(@Body() dto: any) {
        return this.vehicleService.add(dto);
    }

    @Get(':vehicleId')
    findOne(@Param('vehicleId') vehicleId: string) {
        return this.vehicleService.findOne(vehicleId);
    }

    @Get()
    findAll() {
        return this.vehicleService.findAll();
    }
}