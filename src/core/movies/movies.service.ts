import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

export interface Movie {
  readonly id: number;
  readonly title: string;
}

@Injectable()
export class MoviesService {
  private readonly movies = new Map<number, Movie>();

  create(title: string): Movie {
    if (typeof title !== 'string' || title.trim().length === 0) {
      throw new BadRequestException('A movie title is required');
    }

    const movie = Object.freeze({
      id: this.movies.size + 1,
      title: title.trim(),
    });
    this.movies.set(movie.id, movie);
    return movie;
  }

  get(id: number): Movie {
    const movie = this.movies.get(id);
    if (!movie) {
      throw new NotFoundException(`Movie ${id} does not exist`);
    }
    return movie;
  }

  list(): Movie[] {
    return [...this.movies.values()];
  }
}
