import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

import { getRef } from '../helpers'
import { OrderStatus, SchemaCollection } from '../models'

export type OrderDocument = HydratedDocument<Order> & {
  createdAt: Date
  updatedAt: Date
}

@Schema({ timestamps: true, collection: SchemaCollection.orders })
export class Order {
  @Prop({ required: true, type: String })
  customer: string

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.pending })
  status: OrderStatus

  @Prop(getRef(SchemaCollection.products, true))
  products: string[]
}

export const OrderSchema = SchemaFactory.createForClass(Order)
