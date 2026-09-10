import { BadRequestException, Injectable } from '@nestjs/common';

export interface CreateShowtime {
  readonly movieId: number;
  readonly theaterId: number;
  readonly startsAt: string;
}

export interface Showtime extends CreateShowtime {
  readonly id: number;
}

@Injectable()
export class ShowtimesService {
  private readonly showtimes = new Map<number, Showtime>();

  create(input: CreateShowtime): Showtime {
    if (
      typeof input.startsAt !== 'string' ||
      Number.isNaN(Date.parse(input.startsAt))
    ) {
      throw new BadRequestException('startsAt must be a valid date-time');
    }

    const showtime = Object.freeze({
      id: this.showtimes.size + 1,
      movieId: input.movieId,
      theaterId: input.theaterId,
      startsAt: new Date(input.startsAt).toISOString(),
    });
    this.showtimes.set(showtime.id, showtime);
    return showtime;
  }

  listByMovie(movieId: number): Showtime[] {
    return [...this.showtimes.values()].filter(
      (showtime) => showtime.movieId === movieId,
    );
  }
}
