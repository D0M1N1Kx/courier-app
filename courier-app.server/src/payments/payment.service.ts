import { Injectable } from "@nestjs/common";
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
}