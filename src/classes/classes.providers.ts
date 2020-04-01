import { Connection } from 'mongoose';
import { ClassSchema } from './schemas/class.schema';

export const classesProviders = [
  {
    provide: 'CLASS_MODEL',
    useFactory: (connection: Connection) => connection.model('Class', ClassSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];