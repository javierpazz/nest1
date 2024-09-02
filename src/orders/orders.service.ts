import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { ChangeOrderStatusDto } from './dto';
import { Order, OrderItem } from './entities';
import { ProductsService } from './../products/products.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger('OrdersService');

  constructor(

      @InjectRepository(Order)
      private readonly orderRepository: Repository<Order>,
  
      @InjectRepository(OrderItem)
      private readonly orderItemRepository: Repository<OrderItem>,

      private readonly productsService: ProductsService,
    
      private readonly dataSource: DataSource,
  
    ) {}
  
    async create(createOrderDto: CreateOrderDto) {
        try {
          //1 Confirmar los ids de los productos
          const productIds = createOrderDto.items.map((item) => item.productId);
          const products = 
            await this.productsService.validateProducts(productIds);
    
          //2. Cálculos de los valores
          const totalAmount = createOrderDto.items.reduce((acc, orderItem) => {
            const price = products.find(
              (product) => product.id === orderItem.productId,
            ).price;
            return acc + (price * orderItem.quantity);
          }, 0);
    
          const totalItems = createOrderDto.items.reduce((acc, orderItem) => {
            return acc + orderItem.quantity;
          }, 0);
        
          //3. Crear una transacción de base de datos
////////////
      const { ...orderDetails } = createOrderDto;

      const items = orderDetails.items.map( item => this.orderItemRepository.create({
        price: item.price,
        productId: item.productId,
        quantity: item.quantity
        }));

      const neworder = this.orderRepository.create({
      items: orderDetails.items,
      totalAmount,
      totalItems
    });
      await this.orderRepository.save( neworder );
      return {
        ...neworder,
        OrderItem: neworder.items.map((orderItem) => ({
          ...orderItem,
          name: products.find((product) => product.id === orderItem.productId)
            .title,
        })),
      };


      // return { ...neworder };

////////////
        } catch (error) {
          this.handleDBExceptions(error);
        }
      }

      async findAll(orderPaginationDto: OrderPaginationDto) {

        const { limit = 10, offset = 1 } = orderPaginationDto;
        
        const totalPages = await this.orderRepository.count({
          where: {
            status: orderPaginationDto.status,
          },
        });
    
        const currentPage = +offset;
        const perPage = +limit;
    
        return {
          data: await this.orderRepository.find({
            take: perPage,
            skip: (currentPage - 1) * perPage,
            where: {
              status: orderPaginationDto.status,
            },
          }),
          meta: {
            total: totalPages,
            page: currentPage,
            lastPage: Math.ceil(totalPages / perPage),
          },
        };
      }

      async findOne(id: string) {
        const order = await this.orderRepository.findOneBy({id:id})
          // where: { id },
          // include: {
          //   OrderItem: {
          //     select: {
          //       price: true,
          //       quantity: true,
          //       productId: true,
          //     },
          //   },
          // },
        // });
    
        if (!order) {
          this.handleDBExceptions("Order not found JPZ");
        }

        console.log(order);
    const productIds = order.items.map((orderItem) => orderItem.productId);
    const products = 
    await this.productsService.validateProducts(productIds);


    // const products: any[] = await firstValueFrom(
    //   this.productsClient.send({ cmd: 'validate_products' }, productIds),
    // );

    return {
      ...order,
      OrderItem: order.items.map((orderItem) => ({
        ...orderItem,
        name: products.find((product) => product.id === orderItem.productId)
          .title,
      })),
    };
  }
        
  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto;

    const order = await this.findOne(id);
    if (order.status === status) {
      return order;
    }

    return this.orderRepository.save(order);
  }


  
      private handleDBExceptions( error: any ) {

        if ( error.code === '23505' )
          throw new BadRequestException(error.detail);
        
        this.logger.error(error)
        // console.log(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
    
      }

    }
