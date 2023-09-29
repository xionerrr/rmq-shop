import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Post,
  Body,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto'

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  /**
   * The function getAllOrders() returns all orders from the orders service.
   * @returns The getAllOrders() function is returning the result of the getAllOrders() method from the
   * ordersService.
   */
  getAllOrders() {
    return this.ordersService.getAllOrders()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  /**
   * The function getOrder retrieves an order based on the provided id.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of an
   * order.
   * @returns The getOrder method is returning the order with the specified id.
   */
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  /**
   * The function creates an order using the provided data.
   * @param {CreateOrderDto} data - The `data` parameter is of type `CreateOrderDto`. It is an object
   * that contains the necessary information to create an order.
   * @returns The createOrder method is returning the result of the ordersService.createOrder(data)
   * method.
   */
  createOrder(@Body() data: CreateOrderDto) {
    return this.ordersService.createOrder(data)
  }
}
