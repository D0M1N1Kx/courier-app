import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { Payment } from "../entities/payment.entity";
import { User } from "../entities/user.entity";
import { Work } from "../entities/work.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Payment, Work, User])],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}