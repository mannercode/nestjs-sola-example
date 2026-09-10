import { Module } from '@nestjs/common';
import { MoviesModule } from '../../core/movies/index.js';
import { ShowtimesModule } from '../../core/showtimes/index.js';
import { TheatersModule } from '../../core/theaters/index.js';
import { ShowtimeCreationService } from './showtime-creation.service.js';

@Module({
  imports: [MoviesModule, TheatersModule, ShowtimesModule],
  providers: [ShowtimeCreationService],
  exports: [ShowtimeCreationService],
})
export class ShowtimeCreationModule {}
