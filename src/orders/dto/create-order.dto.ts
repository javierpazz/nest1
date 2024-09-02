import { ArrayMinSize, IsArray, IsEnum, isEnum, IsOptional, ValidateNested } from 'class-validator';

import { OrderItemDto } from './order-item.dto';
import { Type } from 'class-transformer';
import { OrderStatus } from '../entities/order.entity';
import { OrderStatusList } from '../enum/order.enum';

export class CreateOrderDto {
  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items?: OrderItemDto[];

  @IsEnum(OrderStatusList,{
    message: `Possible status values are ${ OrderStatusList }`
    })
    @IsOptional()
  status: OrderStatus = OrderStatus.PENDING
}

