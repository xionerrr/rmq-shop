import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'

import { ProductsService } from './products.service'
import { CreateProductDto, DeleteProductDto, UpdateProductDto } from './dto'

import { RMQStatus } from 'library/models'

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  /**
   * The function getAllProducts() returns all products from the products service.
   * @returns The getAllProducts() function is returning the result of the getAllProducts() method from
   * the productsService.
   */
  getAllProducts() {
    return this.productsService.getAllProducts()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  /**
   * The function `getProduct` takes an `id` parameter and returns the product with that id from the
   * products service.
   * @param {string} id - The id parameter is a string that represents the unique identifier of a
   * product.
   * @returns The getProduct method is returning the result of calling the getProduct method from the
   * productsService with the provided id parameter.
   */
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  /**
   * The function creates a product using the data provided in the request body.
   * @param {CreateProductDto} data - The `data` parameter is of type `CreateProductDto`. It is an
   * object that contains the data needed to create a new product.
   * @returns The createProduct method is returning the result of the createProduct method from the
   * productsService.
   */
  createProduct(@Body() data: CreateProductDto) {
    return this.productsService.createProduct(data)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  /**
   * The function `updateProduct` takes an `id` parameter and a `data` parameter, and calls the
   * `updateProduct` method of the `productsService` with these parameters.
   * @param {string} id - The id parameter is a string that represents the unique identifier of the
   * product that needs to be updated. It is passed as a route parameter in the API endpoint.
   * @param {UpdateProductDto} data - The `data` parameter is of type `UpdateProductDto`. It is an
   * object that contains the updated information for the product.
   * @returns The updateProduct method is returning the result of calling the updateProduct method from
   * the productsService with the provided id and data.
   */
  updateProduct(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productsService.updateProduct(id, data)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  /**
   * This function deletes a product using the DeleteProductDto provided in the request body.
   * @param {DeleteProductDto} body - The `body` parameter is of type `DeleteProductDto`. It is an
   * object that contains the necessary information to delete a product.
   * @returns The deleteProduct method is returning the result of the deleteProduct method from the
   * productsService.
   */
  deleteProduct(@Body() body: DeleteProductDto) {
    return this.productsService.deleteProduct(body)
  }

  @EventPattern(RMQStatus.orderCreated)
  /**
   * The function decreases the count of a product and acknowledges the message received from RabbitMQ.
   * @param {unknown} data - The `data` parameter is of type `unknown`, which means it can hold any
   * type of value. It is used to receive the payload data sent to this function.
   * @param {RmqContext} context - The `context` parameter is an object that contains information about
   * the RabbitMQ message and channel. It is provided by the `RmqContext` class.
   */
  async decreaseProductCount(
    @Payload() data: string[],
    @Ctx() context: RmqContext,
  ) {
    this.productsService.decreaseProductsCount(data)

    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()

    channel.ack(originalMessage)
  }
}
