import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CoffeeService {
  private coffees = [
    {
      id: 1,
      name: 'Espresso',
      flavor: 'Rich and bold',
      price: 3.5,
    },
    {
      id: 2,
      name: 'Latte',
      flavor: 'Smooth and creamy',
      price: 4.5,
    },
    {
      id: 3,
      name: 'Cappuccino',
      flavor: 'Foamy with chocolate dust',
      price: 4.0,
    },
    {
      id: 4,
      name: 'Mocha',
      flavor: 'Chocolatey and sweet',
      price: 5.0,
    },
    {
      id: 5,
      name: 'Americano',
      flavor: 'Bold and strong',
      price: 3.0,
    },
    {
      id: 6,
      name: 'Macchiato',
      flavor: 'Bold with a touch of milk',
      price: 4.2,
    },
  ];

  // Method to fetch all coffees, with optional filtering by flavor
  getAllCoffees(flavor?: string) {
    if (flavor) {
      return this.coffees.filter((coffee) =>
        coffee.flavor.toLowerCase().includes(flavor.toLowerCase()),
      );
    }
    return this.coffees;
  }

  // Method to fetch a single coffee by ID
  getCoffeeById(id: number) {
    const coffee = this.coffees.find((coffee) => coffee.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }
}
