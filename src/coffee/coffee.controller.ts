import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CoffeeService } from './coffee.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('coffee')
export class CoffeeController {
  // Recommended approach
  constructor(private readonly coffeeService: CoffeeService) {}

  //Not recommended approach
  // private coffeeService = new CoffeeService();

  // GET all coffees
  @Get()
  @UseGuards(AuthGuard)
  getCoffees(@Query('name') name?: string, @Query('flavor') flavor?: string) {
    return this.coffeeService.getAllCoffees(name, flavor);
  }

  // GET a specific coffee by ID
  @Get(':id')
  getOneCoffee(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.getCoffeeById(id);
  }

  // POST a new coffee
  @Post()
  createCoffee(@Body(new ValidationPipe()) coffeeData: CreateCoffeeDto) {
    return this.coffeeService.createCoffee(coffeeData);
  }

  // PUT (update) a specific coffee by ID
  @Put(':id')
  updateCoffee(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateCoffeeDto,
  ) {
    return this.coffeeService.updateCoffee(id, updateData);
  }

  // DELETE a specific coffee by ID
  @Delete(':id')
  deleteCoffee(@Param('id', ParseIntPipe) id: number) {
    return this.coffeeService.deleteCoffee(id);
  }
}
