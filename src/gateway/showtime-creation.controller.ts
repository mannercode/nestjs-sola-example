import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { ShowtimeCreationService } from '../application/showtime-creation/index.js';
import { MoviesService } from '../core/movies/index.js';
import { TheatersService } from '../core/theaters/index.js';

@Controller('showtime-creation')
export class ShowtimeCreationController {
  constructor(
    private readonly creation: ShowtimeCreationService,
    private readonly movies: MoviesService,
    private readonly theaters: TheatersService,
  ) {}

  @Get('movies')
  listMovies() {
    return this.movies.list();
  }

  @Get('theaters')
  listTheaters() {
    return this.theaters.list();
  }

  @Post()
  create(
    @Body('movieId', ParseIntPipe) movieId: number,
    @Body('theaterId', ParseIntPipe) theaterId: number,
    @Body('startsAt') startsAt: string,
  ) {
    return this.creation.create({ movieId, theaterId, startsAt });
  }
}
