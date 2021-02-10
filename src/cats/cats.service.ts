import { Injectable } from '@nestjs/common';
import {Cat} from "./interfaces/cat.interface";

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.cats.push(cat);
    }

    update(name: string, cat: Cat) {
        this.cats.forEach((value, index) => {
            if (value.name == name) {
                cat.name = name;
                this.cats[index] = cat;
            }
        });
    }

    findAll(): Cat[] {
        return this.cats;
    }

    findByName(name: string): Cat {
        return this.cats.find(cat => cat.name == name);
    }

    delete(name: string) {
        const index = this.cats.findIndex(cat => cat.name == name);
        if (index != -1) {
            this.cats.splice(index, 1);
        }
    }
}
