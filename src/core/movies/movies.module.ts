import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service.js';

@Module({ providers: [MoviesService], exports: [MoviesService] })
export class MoviesModule {}
