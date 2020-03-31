import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassesService {
private classes = [];

getAllClasses() {
    return this.classes;
}

}
