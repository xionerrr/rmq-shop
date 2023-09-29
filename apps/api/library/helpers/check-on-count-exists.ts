import { NotFoundException } from '@nestjs/common'

export function checkOnCountExist(count: number) {
  if (count <= 0) throw new NotFoundException(`This product is out of stock`)
}
