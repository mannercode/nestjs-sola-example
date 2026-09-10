import { Module } from '@nestjs/common';
import { ShowtimeCreationModule } from '../application/showtime-creation/index.js';
import { MoviesModule } from '../core/movies/index.js';
import { ShowtimesModule } from '../core/showtimes/index.js';
import { TheatersModule } from '../core/theaters/index.js';
import { MoviesController } from './movies.controller.js';
import { ShowtimeCreationController } from './showtime-creation.controller.js';
import { TheatersController } from './theaters.controller.js';

@Module({
  imports: [
    MoviesModule,
    TheatersModule,
    ShowtimesModule,
    ShowtimeCreationModule,
  ],
  controllers: [
    MoviesController,
    TheatersController,
    ShowtimeCreationController,
  ],
})
export class GatewayModule {}
