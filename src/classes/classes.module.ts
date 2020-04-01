import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';

import { classesProviders } from './classes.providers';
import { ClassSchema } from './schemas/class.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClassesController],
  providers: [ClassesService,
  ...classesProviders]
})
export class ClassesModule {}
