import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ConfigModule } from '@nestjs/config'

import { RMQModule } from './modules'
import {
  DBModule,
  OrdersModule,
  ProductsModule,
} from 'apps/consumer/src/modules'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../../.env' }),
    DBModule,
    OrdersModule,
    ProductsModule,
    RMQModule,
  ],
})
export class ProducerModule {}
