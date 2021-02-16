import { ObjectType, Field, ID } from '@nestjs/graphql';
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../../roles/entities/role.entity";

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    username: string;

    @Column()
    @Field()
    password: string;

    @Column()
    @Field()
    email: string;

    @ManyToMany(type => Role, rol => rol.users)
    @JoinTable()
    @Field(() => [Role!]!,{nullable:true})
    roles: Role[];
}
