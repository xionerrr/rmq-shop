import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateProductDto {
  @ApiProperty({ default: 'title' })
  @IsString()
  @IsOptional()
  title: string

  @ApiProperty({ default: 1 })
  @IsNumber()
  @IsOptional()
  count: number
}
