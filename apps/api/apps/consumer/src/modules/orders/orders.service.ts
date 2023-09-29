import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ClientProxy } from '@nestjs/microservices'
import { Model } from 'mongoose'
import { lastValueFrom } from 'rxjs'

import { ProductsService } from '../products/products.service'

import { CreateOrderDto } from './dto'

import { Order, OrderDocument } from 'library/schemas'
import {
  checkOnCountExist,
  checkOnExist,
  checkOnValidId,
  response,
} from 'library/helpers'
import { OrderStatus, RMQServiceOption, RMQStatus } from 'library/models'

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private OrderModel: Model<OrderDocument>,
    @Inject(RMQServiceOption.default) private client: ClientProxy,
    private productsService: ProductsService,
  ) {
    this.setOrderCompleted()
  }

  /**
   * The function `getAllOrders` fetches all orders from the database and returns them with a success
   * message, or throws a ForbiddenException with an error message if an error occurs.
   * @returns a promise that resolves to an array of orders.
   */
  async getAllOrders() {
    try {
      const orders = await this.OrderModel.find({})

      return response(orders, 'Successfully fetched')
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  /**
   * The function getOrder retrieves an order by its ID and returns it if it exists, otherwise it
   * throws an exception.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of an
   * order.
   * @returns a response object with the order data and a success message.
   */
  async getOrder(id: string) {
    try {
      checkOnValidId(id)

      const order = await this.OrderModel.findOne({
        _id: id,
      })
      checkOnExist(order, id)

      return response(order, 'Successfully fetched')
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      } else {
        throw new ForbiddenException(error.message)
      }
    }
  }

  /**
   * The function creates a new order with the provided data and sets its status to pending, returning
   * a success message if successful or throwing a ForbiddenException if an error occurs.
   * @param {CreateOrderDto} data - The `data` parameter is of type `CreateOrderDto`, which is an
   * object containing the necessary information to create an order.
   * @returns a response object with a null value and a success message string.
   */
  async createOrder(data: CreateOrderDto) {
    try {
      if (!data.products.length)
        throw new ForbiddenException(`You need to provide at least one product`)

      for (const product of data.products) {
        checkOnValidId(product)
        const result = await this.productsService.getProduct(product)
        checkOnCountExist(result.data.count)
      }

      const order = await this.OrderModel.create({
        ...data,
        status: OrderStatus.pending,
      })

      if (order)
        await lastValueFrom(
          this.client.emit(RMQStatus.orderCreated, order.products),
        )

      return response(null, 'Successfully created')
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  /**
   * The function updates the status of an order with the given ID.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * order. It is used to find and update the order with the specified id.
   * @param {OrderStatus} status - The `status` parameter is of type `OrderStatus`, which represents
   * the status of an order. It is used to update the status of an order in the database.
   * @returns a response object with a success message if the order status is successfully updated. If
   * there is an error, a ForbiddenException is thrown.
   */
  async updateOrderStatus(id: string, status: OrderStatus) {
    try {
      checkOnValidId(id)

      const order = await this.OrderModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            status,
          },
        },
      )
      checkOnExist(order, id)

      return response(null, `Successfully updated ${order._id}`)
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  /**
   * The function sets the status of orders that were created more than 10 minutes ago to "completed".
   */
  async setOrderCompleted() {
    try {
      const orders = await this.OrderModel.find({
        status: OrderStatus.pending,
      })

      if (orders.length && orders.length > 0) {
        const filteredOrdersIds = orders
          .filter(
            (order) =>
              order.createdAt < new Date(new Date().getTime() - 1000 * 60 * 10),
          )
          .map((order) => order._id)

        await this.OrderModel.updateMany(
          {
            _id: filteredOrdersIds,
          },
          {
            status: OrderStatus.completed,
          },
        )
      }
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }
}
