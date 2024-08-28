import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([ Order ]),
    AuthModule,
  ],
  exports: [
    OrdersService,
    TypeOrmModule,
  ]
})
export class OrdersModule {}
