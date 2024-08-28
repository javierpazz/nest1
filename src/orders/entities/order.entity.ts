import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
    PENDING,
    DELIVERED,
    CANCELLED
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
    })    
    status: OrderStatus

    @Column('bool', {
        default: true
    })
    isActive: boolean;
    
    @Column('date', {
        nullable: true
    })
    paidAt: Date;

    // // images
    // @OneToMany(
    //     () => OrderItem,
    //     (orderItem) => orderItem.order,
    //     { cascade: true, eager: true }
    // )
    // images?: OrderItem[];

}
