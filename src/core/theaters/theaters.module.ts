import { Module } from '@nestjs/common';
import { TheatersService } from './theaters.service.js';

@Module({ providers: [TheatersService], exports: [TheatersService] })
export class TheatersModule {}
