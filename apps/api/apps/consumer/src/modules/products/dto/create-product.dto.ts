import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateProductDto {
  @ApiProperty({ default: 'title' })
  @IsString()
  @IsNotEmpty()
  title: string
}
