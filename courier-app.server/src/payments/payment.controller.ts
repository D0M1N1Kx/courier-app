import { Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    @Post('pay/:userId')
    payUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.paymentService.payUser(userId);
    }

    @Get('all')
    getPayments() {
        return this.paymentService.getPayments();
    }

    @Get('user/:userId')
    getUserPayments(@Param('userId', ParseIntPipe) userId: number) {
        return this.paymentService.getUserPayments(userId);
    }
}