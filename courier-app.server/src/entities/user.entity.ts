import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Vehicle } from './vehicle.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 256 })
    email: string;

    @Column()
    passwordHash: string;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ default: false })
    isAdmin: boolean;

    @Column({ default: false })
    isApproved: boolean;

    @Column({ nullable: true })
    vehicleId: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Vehicle, { nullable: true })
    @JoinColumn({ name: 'vehicleId' })
    vehicle: Vehicle;
}