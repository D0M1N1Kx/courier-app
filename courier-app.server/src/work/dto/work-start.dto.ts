import { IsInt, IsNumber } from "class-validator";

export class WorkStartDto {
    @IsInt()
    userId: number;

    @IsInt()
    packageCount: number;

    @IsNumber()
    pricePerPackage: number;
}