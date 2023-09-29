import { DynamicModule, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { RMQService } from './rmq.service'

import { RMQModuleOptionsProps } from 'library/models'

@Module({
  providers: [RMQService],
  exports: [RMQService],
})
export class RMQModule {
  static register({ name }: RMQModuleOptionsProps): DynamicModule {
    return {
      module: RMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_QUEUE`),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    }
  }
}
