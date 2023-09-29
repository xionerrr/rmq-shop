import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductsModule } from '../products'

import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'

import { Order, OrderSchema } from 'library/schemas'
import { RMQServiceOption } from 'library/models'
import { RMQModule } from 'apps/producer/src/modules'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    RMQModule.register({
      name: RMQServiceOption.default,
    }),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
