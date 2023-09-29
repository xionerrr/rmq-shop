import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'

import { OrderStatus } from 'library/models'

export class UpdateOrderDto {
  @ApiProperty({ default: 'customer' })
  @IsString()
  @IsOptional()
  customer: string

  @ApiProperty({ default: OrderStatus.pending })
  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus
}
