import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

import { SchemaCollection } from '../models'

export type ProductDocument = HydratedDocument<Product> & {
  createdAt: Date
  updatedAt: Date
}

@Schema({ timestamps: true, collection: SchemaCollection.products })
export class Product {
  @Prop({ required: true, type: String })
  title: string

  @Prop({ type: Number, default: 1 })
  count: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)
