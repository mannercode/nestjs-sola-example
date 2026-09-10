import { Body, Controller, Post } from '@nestjs/common';
import { TheatersService } from '../core/theaters/index.js';

@Controller('theaters')
export class TheatersController {
  constructor(private readonly theaters: TheatersService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.theaters.create(name);
  }
}
