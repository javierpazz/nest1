import { Order } from './';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';



@Entity({ name: 'orderItems' })
export class OrderItem {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  productId: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column('float',{
    default: 0
    })
  price: number;

  // Relaciones

    // @ManyToOne( () => OrderItem, (orderItem)=> orderItem.orderItem, { lazy: true })
    // orderItem: OrderItem;
  


  @ManyToOne(
    () => Order,
    (order) => order.items, { lazy: true }
  )
  order: Order

}

