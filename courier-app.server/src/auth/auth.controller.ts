import { Body, Controller, Get, Param, Post, Put, ParseIntPipe, ParseBoolPipe, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Get('users')
    getUsers() {
        return this.authService.getUsers();
    }

    @Get('users/:userId')
    getUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.authService.getUser(userId);
    }

    @Put('users/:userId/vehicle')
    assignVehicle(@Param('userId', ParseIntPipe) userId: number, @Query('vehicleId') vehicleId: string) {
        return this.authService.assignVehicle(userId, vehicleId);
    }

    @Put('users/:userId/approve/:boolean')
    approveUser(@Param('userId', ParseIntPipe) userId: number, @Param('boolean', ParseBoolPipe) approve: boolean) {
        return this.authService.approveUser(userId, approve);
    }
}