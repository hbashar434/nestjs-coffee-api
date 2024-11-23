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
import { SuccessMessages } from 'src/common/enums/success-messages.enum';

@Controller('coffee')
export class CoffeeController {
  // Recommended approach
  constructor(private readonly coffeeService: CoffeeService) {}

  // GET all coffees
  @Get()
  @UseGuards(AuthGuard)
  getCoffees(@Query('name') name?: string, @Query('flavor') flavor?: string) {
    const coffees = this.coffeeService.getAllCoffees(name, flavor);
    return {
      message: SuccessMessages.COFFEE_LIST_FETCHED,
      data: coffees,
    };
  }

  // GET a specific coffee by ID
  @Get(':id')
  getOneCoffee(@Param('id', ParseIntPipe) id: number) {
    const coffee = this.coffeeService.getCoffeeById(id);
    return {
      message: SuccessMessages.COFFEE_FETCHED,
      data: coffee,
    };
  }

  // POST a new coffee
  @Post()
  createCoffee(@Body(new ValidationPipe()) coffeeData: CreateCoffeeDto) {
    const createdCoffee = this.coffeeService.createCoffee(coffeeData);
    return {
      message: SuccessMessages.COFFEE_CREATED,
      data: createdCoffee,
    };
  }

  // PUT (update) a specific coffee by ID
  @Put(':id')
  updateCoffee(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateCoffeeDto,
  ) {
    const updatedCoffee = this.coffeeService.updateCoffee(id, updateData);
    return {
      message: SuccessMessages.COFFEE_UPDATED,
      data: updatedCoffee,
    };
  }

  // DELETE a specific coffee by ID
  @Delete(':id')
  deleteCoffee(@Param('id', ParseIntPipe) id: number) {
    this.coffeeService.deleteCoffee(id);
    return {
      message: SuccessMessages.COFFEE_DELETED,
    };
  }
}
