import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('vehicles')
export class Vehicle {
    @PrimaryColumn({ length: 20 })
    vehicleId: string;

    @Column({ length: 50 })
    brand: string;

    @Column({ length: 50 })
    model: string;

    @Column({ length: 10 })
    licensePlate: string;

    @Column()
    packageCapacity: number;
}