import { IsString, IsNumber, MinLength, IsPositive } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  name: string;

  @IsString()
  @MinLength(3, { message: 'Flavor must be at least 2 characters long.' })
  flavor: string;

  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number.' })
  price: number;
}
