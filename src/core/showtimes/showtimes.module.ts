import { Module } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service.js';

@Module({ providers: [ShowtimesService], exports: [ShowtimesService] })
export class ShowtimesModule {}
