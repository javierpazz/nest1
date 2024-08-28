import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { ChangeOrderStatusDto } from './dto';
import { firstValueFrom, throwError } from 'rxjs';
// import { Order, OrderItem } from './entities';
import { Order } from './entities';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger('OrdersService');

  constructor(

      @InjectRepository(Order)
      private readonly orderRepository: Repository<Order>,
  
      // @InjectRepository(OrderItem)
      // private readonly orderItemRepository: Repository<OrderItem>,
  
      private readonly dataSource: DataSource,
  
    ) {}
  
    create(createOrderDto: CreateOrderDto) {


      const order = this.orderRepository.create( createOrderDto );
    
      return this.orderRepository.save( order );
  
    }
  
}
