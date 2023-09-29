import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as dotenv from 'dotenv'

import { ProducerModule } from './producer.module'

/**
 * This TypeScript function sets up a Nest app with CORS configuration, a global prefix for requests,
 * and Swagger documentation.
 */
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
  const app = await NestFactory.create(ProducerModule, {
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

  // Global prefix on each request
  app.setGlobalPrefix('/api')

  // Creating Swagger class
  const config = new DocumentBuilder()
    .setTitle('Internet shop')
    .setDescription('API documentation')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(4000, () => {
    console.log('🌿 Server is running at http://localhost:4000 🌿')
  })
}

bootstrap()
