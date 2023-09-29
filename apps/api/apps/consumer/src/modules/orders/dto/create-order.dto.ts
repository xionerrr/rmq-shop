import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator'

export class CreateOrderDto {
  @ApiProperty({ default: 'customer' })
  @IsString()
  @IsNotEmpty()
  customer: string

  @ApiProperty({ default: [] })
  @IsArray()
  products: string[]
}
