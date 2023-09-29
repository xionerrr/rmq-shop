import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'

import { ConsumerModule } from './consumer.module'
import { RMQService } from 'apps/producer/src/modules'

async function bootstrap() {
  // Load environment variables from .env
  dotenv.config()

  // Whitelist ips which are allowed to do requests
  const whitelist = [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:4000',
    'http://localhost:5173',
  ]

  // Creating Nest app
  const app = await NestFactory.create(ConsumerModule, {
    cors: {
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error(`Not allowed by CORS`))
        }
      },
      credentials: true,
    },
  })

  // Connecting microservices
  const rmqService = app.get<RMQService>(RMQService)
  app.connectMicroservice(rmqService.getOptions())
  await app.startAllMicroservices()
}

bootstrap()
