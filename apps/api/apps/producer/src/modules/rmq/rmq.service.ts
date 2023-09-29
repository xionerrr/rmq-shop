import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RmqOptions, Transport } from '@nestjs/microservices'

@Injectable()
export class RMQService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBIT_MQ_URI')],
        queue: this.configService.get<string>(`RABBIT_MQ_QUEUE`),
        noAck: false,
        persistent: true,
      },
    }
  }
}
