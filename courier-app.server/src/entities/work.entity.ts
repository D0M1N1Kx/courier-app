import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from './user.entity';

@Entity('works')
export class Work {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    packageCount: number;

    @Column('double precision')
    pricePerPackage: number;

    @Column()
    startTime: Date;

    @Column({ nullable: true })
    endTime: Date;

    @Column({ nullable: true })
    proofImagePath: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    get totalEarned(): number {
        return this.packageCount * this.pricePerPackage;
    }

    get isCompleted(): boolean {
        return !!this.endTime;
    }
}