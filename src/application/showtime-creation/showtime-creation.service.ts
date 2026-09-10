import { Injectable } from '@nestjs/common';
import { MoviesService } from '../../core/movies/index.js';
import {
  ShowtimesService,
  type CreateShowtime,
} from '../../core/showtimes/index.js';
import { TheatersService } from '../../core/theaters/index.js';

@Injectable()
export class ShowtimeCreationService {
  constructor(
    private readonly movies: MoviesService,
    private readonly theaters: TheatersService,
    private readonly showtimes: ShowtimesService,
  ) {}

  create(input: CreateShowtime) {
    this.movies.get(input.movieId);
    this.theaters.get(input.theaterId);
    return this.showtimes.create(input);
  }
}
