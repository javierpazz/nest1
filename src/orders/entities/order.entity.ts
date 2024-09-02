import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './';

export enum OrderStatus {
    PENDING = "PENDING",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

@Entity({ name: 'orders' })
export class Order {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('float',{
        default: 0
    })
    totalAmount: number;

    @Column('int', {
        default: 0
    })
    totalItems: number;

    @Column('text', {
        default: OrderStatus.PENDING
    })    
    status: OrderStatus

    @Column('bool', {
        default: true
    })
    isActive: boolean;
    @Column({
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP' 
      })
      paidAt: Date;

    // Relaciones

    @OneToMany(
    () => OrderItem,
    (orderItem) => orderItem.order,
    { cascade: true, eager: true }
    // { cascade: true, lazy: true }
    // { cascade: true }
    )
    items?: OrderItem[]


}
