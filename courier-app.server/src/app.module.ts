import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Work } from './entities/work.entity';
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { WorkModule } from './work/work.module';
import { Payment } from './entities/payment.entity';
import { PaymentModule } from './payments/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD') || '',
        database: config.get<string>('DB_NAME'),
        entities: [User, Vehicle, Work, Payment],
        synchronize: true,
      }),
    }),
    AuthModule,
    VehicleModule,
    WorkModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
