import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeeService {
  private coffees = [
    {
      id: 1,
      name: 'Espresso',
      flavor: 'Rich and bold',
      price: 1.99,
    },
    {
      id: 2,
      name: 'Latte',
      flavor: 'Smooth and creamy',
      price: 2.49,
    },
    {
      id: 3,
      name: 'Cappuccino',
      flavor: 'Foamy with chocolate dust',
      price: 2.99,
    },
    {
      id: 4,
      name: 'Mocha',
      flavor: 'Chocolatey and sweet',
      price: 3.49,
    },
    {
      id: 5,
      name: 'Americano',
      flavor: 'Bold and strong',
      price: 1.79,
    },
    {
      id: 6,
      name: 'Macchiato',
      flavor: 'Bold with a touch of milk',
      price: 2.29,
    },
  ];

  // Method to fetch all coffees, with optional filtering by flavor
  getAllCoffees(name?: string, flavor?: string) {
    return this.coffees.filter((coffee) => {
      const matchesName = name
        ? coffee.name.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchesFlavor = flavor
        ? coffee.flavor.toLowerCase().includes(flavor.toLowerCase())
        : true;
      return matchesName && matchesFlavor;
    });
  }

  // Method to fetch a single coffee by ID
  getCoffeeById(id: number) {
    const coffee = this.coffees.find((coffee) => coffee.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }

  // POST a new coffee
  createCoffee(coffeeData: CreateCoffeeDto) {
    const newCoffee = { id: Date.now(), ...coffeeData };
    this.coffees.push(newCoffee);
    return newCoffee;
  }

  // PUT (update) a specific coffee by ID
  updateCoffee(id: number, updateData: UpdateCoffeeDto) {
    const coffee = this.getCoffeeById(id);
    Object.assign(coffee, updateData);
    return coffee;
  }

  // DELETE a specific coffee by ID
  deleteCoffee(id: number) {
    const index = this.coffees.findIndex((coffee) => coffee.id === id);
    if (index === -1) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return this.coffees.splice(index, 1);
  }
}
