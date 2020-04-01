import { Module } from '@nestjs/common';
import { ClassesModule } from './classes/classes.module';

import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [ClassesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
