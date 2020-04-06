import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database.module';
import { usersProviders } from './users.providers';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
  JwtModule.register({
    secret: 'topSecret51',
    signOptions: {
      expiresIn: 3600
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,
    // ...usersProviders
  ],
    exports: [JwtStrategy, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])]
})
export class AuthModule {}
