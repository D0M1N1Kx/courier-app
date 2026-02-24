import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "../entities/payment.entity";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Work } from "../entities/work.entity";

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
        @InjectRepository(Work) private workRepo: Repository<Work>,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}

    async payUser(userId: number) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found!');

        const works = await this.workRepo.find({ where: { userId } });
        const completedWorks = works.filter(w => w.isCompleted);

        const amount = completedWorks.reduce((sum, w) => sum + w.packageCount * w.pricePerPackage, 0);

        const packageCount = completedWorks.reduce((sum, w) => sum + w.packageCount, 0);

        const payment = this.paymentRepo.create({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            amount,
            packageCount,
        });

        await this.paymentRepo.save(payment);
        await this.workRepo.remove(works);

        return this.toResponse(payment);
    }

    async getPayments() {
        return this.paymentRepo.find({ order: { paidAt: 'DESC' } });
    }

    async getUserPayments(userId: number) {
        return this.paymentRepo.find({ where: { userId }, order: { paidAt: 'DESC' } });
    }

    private toResponse(payment: Payment) {
        return {
            id: payment.id,
            userId: payment.userId,
            firstName: payment.firstName,
            lastName: payment.lastName,
            amount: payment.amount,
            packageCount: payment.packageCount,
            paidAt: payment.paidAt,
        }
    }
}