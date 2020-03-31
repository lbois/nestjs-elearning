import { Module } from '@nestjs/common';
import { ClassesModule } from './classes/classes.module';


@Module({
  imports: [ClassesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
