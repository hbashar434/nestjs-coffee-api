import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CoffeeService } from './coffee.service';

@Controller('coffee')
export class CoffeeController {
  // Recommended approach
  constructor(private readonly coffeeService: CoffeeService) {}

  //Not recommended approach
  // private coffeeService = new CoffeeService();

  // GET all coffees
  @Get()
  getCoffees(@Query('name') name?: string, @Query('flavor') flavor?: string) {
    return this.coffeeService.getAllCoffees(name, flavor);

    //Not recommended approach
    // return this.coffeeService.getAllCoffees(name, flavor);
  }

  // GET a specific coffee by ID
  @Get(':id')
  getOneCoffee(@Param('id') id: string) {
    return { id, property: 'Details of a specific coffee' };
  }

  // POST a new coffee
  @Post()
  createCoffee(@Body() coffeeData: CreateCoffeeDto) {
    return {
      message: 'Coffee created successfully!',
      coffee: coffeeData,
    };
  }

  // PUT (update) a specific coffee by ID
  @Put(':id')
  updateCoffee(@Param('id') id: string, @Body() updateData: UpdateCoffeeDto) {
    return {
      message: `Coffee with ID ${id} updated successfully!`,
      updatedProperties: updateData,
    };
  }

  // DELETE a specific coffee by ID
  @Delete(':id')
  deleteCoffee(@Param('id') id: string) {
    return { message: `Coffee with ID ${id} deleted successfully!` };
  }
}
