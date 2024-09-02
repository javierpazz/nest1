import { Body, Controller, Get, NotImplementedException, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto ) {
    return this.ordersService.findAll(orderPaginationDto);
  }
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe ) id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe ) id: string,
    @Body() statusDto: StatusDto,
   ) {
    console.log (statusDto);
    return this.ordersService.changeStatus(id, statusDto)
  }
}
