import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty } from 'class-validator'

export class DeleteProductDto {
  @ApiProperty({ default: [] })
  @IsArray()
  @IsNotEmpty()
  ids: string[]
}
