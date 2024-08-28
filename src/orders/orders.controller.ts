import { Body, Controller, Get, NotImplementedException, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { ChangeOrderStatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // @MessagePattern('createOrder')
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  // // @MessagePattern('findAllOrders')
  // @Get()
  // findAll(@Query() orderPaginationDto: OrderPaginationDto ) {
  //   return this.ordersService.findAll(orderPaginationDto);
  // }

  // // @MessagePattern('findOneOrder')
  // @Get()
  // findOne(@Query('id', ParseUUIDPipe ) id: string) {
  //   return this.ordersService.findOne(id);
  // }

  // // @MessagePattern('changeOrderStatus')
  // @Patch()
  // changeOrderStatus(@Body() changeOrderStatusDto: ChangeOrderStatusDto ) {
  //   return this.ordersService.changeStatus(changeOrderStatusDto)

  // }

}
