import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

export interface Theater {
  readonly id: number;
  readonly name: string;
}

@Injectable()
export class TheatersService {
  private readonly theaters = new Map<number, Theater>();

  create(name: string): Theater {
    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new BadRequestException('A theater name is required');
    }

    const theater = Object.freeze({
      id: this.theaters.size + 1,
      name: name.trim(),
    });
    this.theaters.set(theater.id, theater);
    return theater;
  }

  get(id: number): Theater {
    const theater = this.theaters.get(id);
    if (!theater) {
      throw new NotFoundException(`Theater ${id} does not exist`);
    }
    return theater;
  }

  list(): Theater[] {
    return [...this.theaters.values()];
  }
}
