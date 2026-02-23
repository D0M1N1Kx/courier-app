import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class VehicleDto {
  @ApiProperty()
  @IsString()
  vehicleId: string;

  @ApiProperty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  licensePlate: string;

  @ApiProperty()
  @IsInt()
  packageCapacity: number;
}