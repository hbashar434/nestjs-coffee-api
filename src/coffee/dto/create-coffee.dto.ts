import { MinLength } from 'class-validator';

export class CreateCoffeeDto {
  @MinLength(3)
  name: string;
  flavor: string;
  price: number;
}
