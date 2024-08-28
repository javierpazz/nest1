import { Order } from '.';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'orderItems' })
export class OrderItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    // @ManyToOne(
    //     () => Order,
    //     ( order ) => order.images,
    //     {  onDelete: 'CASCADE' }
    // )
    // order: Order

}