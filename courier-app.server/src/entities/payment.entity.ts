import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column('double precision')
    amount: number;

    @Column()
    packageCount: number;

    @CreateDateColumn()
    paidAt: Date;
}