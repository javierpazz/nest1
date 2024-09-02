import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrderItem } from './entities';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([ Order, OrderItem ]),
    AuthModule,
    ProductsModule,
  ],
  exports: [
    OrdersService,
    TypeOrmModule,
  ]
})
export class OrdersModule {}
