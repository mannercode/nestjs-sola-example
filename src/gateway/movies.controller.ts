import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MoviesService } from '../core/movies/index.js';
import { ShowtimesService } from '../core/showtimes/index.js';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly movies: MoviesService,
    private readonly showtimes: ShowtimesService,
  ) {}

  @Post()
  create(@Body('title') title: string) {
    return this.movies.create(title);
  }

  @Get(':id/showtimes')
  listShowtimes(@Param('id', ParseIntPipe) id: number) {
    return {
      movie: this.movies.get(id),
      showtimes: this.showtimes.listByMovie(id),
    };
  }
}
