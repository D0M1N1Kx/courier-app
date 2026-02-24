// ======================
// Models
// ======================

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isApproved: boolean;
    vehicleId?: string;
    createdAt: string;
}

export interface Vehicle {
    vehicleId: string;
    brand: string;
    model: string;
    licensePlate: string;
    packageCapacity: number;
}

export interface Work {
    id: number;
    userId: number;
    packageCount: number;
    pricePerPackage: number;
    totalEarned: number;
    startTime: string;
    endTime?: string;
    proofImagePath: string;
    isCompleted: boolean;
}

// ======================
// REQUEST DTOs
// ======================

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface WorkStartDto {
    userId: number;
    packageCount: number;
    pricePerPackage: number;
}

export interface VehicleDto {
    vehicleId: string;
    brand: string;
    model: string;
    licensePlate: string;
    packageCapacity: number;
}

// ======================
// RESPONSE DTOs
// ======================

export interface UserResponseDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isApproved: boolean;
    vehicleId?: string;
}

export interface WorkResponseDto {
    id: number;
    userId: number;
    packageCount: number;
    pricePerPackage: number;
    totalEarned: number;
    startTime: string;
    endTime?: string;
    isCompleted: boolean;
    proofImagePath?: string;
}

export interface PaymentResponseDto {
    id: number,
    userId: number;
    firstName: string;
    lastname: string;
    amount: number;
    packageCount: number;
    paidAt: Date;
};