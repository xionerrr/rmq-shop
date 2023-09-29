import { NotFoundException } from '@nestjs/common'

/**
 * The function checks if a product with a specific ID exists in the given data and throws a
 * NotFoundException if it does not.
 * @param {unknown} data - The `data` parameter is of type `unknown`, which means it can be any type.
 * It represents the data that needs to be checked for existence.
 * @param {string} id - The `id` parameter is a string that represents the identifier of a product.
 */
export function checkOnExist(data: unknown, id: string) {
  if (!data) throw new NotFoundException(`Product with ${id} not found`)
}
