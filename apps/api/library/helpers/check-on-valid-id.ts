import { BadRequestException } from '@nestjs/common'
import { Types } from 'mongoose'

/**
 * The function checks if a given ID is a valid ObjectId and throws an exception if it is not.
 * @param {string} id - The parameter `id` is a string representing an ObjectId.
 */
export function checkOnValidId(id: string) {
  if (!Types.ObjectId.isValid(id))
    throw new BadRequestException(`Invalid ObjectId: ${id}`)
}
