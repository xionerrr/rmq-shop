import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ConfigModule } from '@nestjs/config'

import { DBModule, OrdersModule, ProductsModule } from './modules'

import { RMQModule } from 'apps/producer/src/modules'

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
export class ConsumerModule {}
