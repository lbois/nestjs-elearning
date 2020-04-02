import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Model } from 'mongoose';
import { User } from './user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>,
        private jwtService: JwtService
      ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password, profile} = authCredentialsDto;
        console.log(authCredentialsDto);
        
        const exists = await this.userModel.countDocuments({ username });

        console.log(exists);
        if (exists > 0) { // duplicate
            throw new ConflictException('username already exists');
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await this.hashPassword(password, salt);
        

        const createdUser = new this.userModel({username, password: hashedPassword, salt, profile});

        await createdUser.save();
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;

        const user = await this.userModel.findOne({ username });


        if ( user !== null && user !== undefined ) {
        const hash = await bcrypt.hash(password, user.salt);

        if ( hash === user.password) {

            const payload: JwtPayload = { username , role: user.profile};
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            return null;
        }
        } else {
            return null;
        }

    }

    async hashPassword(password: string, salt:string):Promise<string> {
        return bcrypt.hash(password, salt);

    }

}
