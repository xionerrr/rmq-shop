import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateProductDto, DeleteProductDto, UpdateProductDto } from './dto'

import { checkOnExist, checkOnValidId, response } from 'library/helpers'
import { Product, ProductDocument } from 'library/schemas'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private ProductModel: Model<ProductDocument>,
  ) {}

  /**
   * The above function retrieves all products from the database and returns them with a success
   * message, or throws a ForbiddenException with an error message if an error occurs.
   * @returns a promise that resolves to an array of products.
   */
  async getAllProducts() {
    try {
      const products = await this.ProductModel.find({})

      return response(products, 'Successfully fetched')
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  /**
   * The function `getProduct` fetches a product by its ID and returns it if it exists, otherwise it
   * throws an appropriate exception.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
   * product.
   * @returns a response object with the fetched product and a success message.
   */
  async getProduct(id: string) {
    try {
      checkOnValidId(id)

      const product = await this.ProductModel.findOne({
        _id: id,
      })
      checkOnExist(product, id)

      return response(product, 'Successfully fetched')
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      } else {
        throw new ForbiddenException(error.message)
      }
    }
  }

  /**
   * The function creates a new product using the provided data and returns a success message or throws
   * an error if there is a problem.
   * @param {CreateProductDto} data - The `body` parameter is of type `CreateProductDto`, which is an
   * object containing the data needed to create a new product.
   * @returns a response object with a message of 'Successfully created' and a null value for the data.
   */
  async createProduct(data: CreateProductDto) {
    try {
      await this.ProductModel.create(data)

      return response(null, 'Successfully created')
    } catch (error) {
      throw new ForbiddenException(error.message)
    }
  }

  /**
   * The function updates a product with the given ID and data, and returns a success message.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * product that needs to be updated.
   * @param {UpdateProductDto} data - The `data` parameter is an object of type `UpdateProductDto`
   * which contains the updated data for the product.
   * @returns a response object with a success message if the product is successfully updated. If an
   * error occurs, it will throw either a NotFoundException or a ForbiddenException.
   */
  async updateProduct(id: string, data: UpdateProductDto) {
    try {
      checkOnValidId(id)

      const product = await this.ProductModel.findOneAndUpdate(
        { _id: id },
        data,
      )
      checkOnExist(product, id)

      return response(null, `Successfully updated ${product.title}`)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      } else {
        throw new ForbiddenException(error.message)
      }
    }
  }

  /**
   * The function decreases the count of products with the given IDs by 1.
   * @param {string[]} ids - An array of string values representing the IDs of the products to be
   * updated.
   */
  async decreaseProductsCount(ids: string[]) {
    try {
      for (const id of ids) {
        checkOnValidId(id)
      }

      await this.ProductModel.updateMany(
        { _id: ids },
        {
          $inc: { count: -1 },
        },
      )
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      } else {
        throw new ForbiddenException(error.message)
      }
    }
  }

  /**
   * The `deleteProduct` function deletes multiple products from the database and returns a success
   * message with the titles of the deleted products.
   * @param {DeleteProductDto} body - The `body` parameter is an object of type `DeleteProductDto`. It
   * contains the following properties:
   * @returns a response object with the message "Successfully deleted" followed by the titles of the
   * deleted products joined by commas.
   */
  async deleteProduct(body: DeleteProductDto) {
    try {
      const result = []

      for (const id of body.ids) {
        checkOnValidId(id)

        const productExist = await this.ProductModel.findOne({
          _id: id,
        })
        checkOnExist(productExist, id)

        result.push(productExist.title)
      }

      await this.ProductModel.deleteMany({
        _id: body.ids,
      })

      return response(null, `Successfully deleted ${result.join(', ')}`)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      } else {
        throw new ForbiddenException(error.message)
      }
    }
  }
}
