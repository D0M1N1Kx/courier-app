import { IsInt, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class WorkStartDto {
    @ApiProperty()
    @IsInt()
    userId: number;

    @ApiProperty()
    @IsInt()
    packageCount: number;

    @ApiProperty()
    @IsNumber()
    pricePerPackage: number;
}