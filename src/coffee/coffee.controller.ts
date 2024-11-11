import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {
  @Get()
  getCoffees() {
    return [{ property: 'Hello from coffee array!' }];
  }

  @Get(':id')
  getOneCoffee(@Param('id') id: string) {
    return { id: id };
  }
}
