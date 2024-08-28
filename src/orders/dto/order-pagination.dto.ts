import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from './../../common/dtos/pagination.dto';
import { OrderStatusList } from '../enum/order.enum';
import { OrderStatus } from './../entities/order.entity';


export class OrderPaginationDto extends PaginationDto {


  @IsOptional()
  @IsEnum( OrderStatusList, {
    message: `Valid status are ${ OrderStatusList }`
  })
  status: OrderStatus;


}