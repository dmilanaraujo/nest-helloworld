import {Field, ObjectType} from '@nestjs/graphql';
import {PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from 'typeorm';

@ObjectType({description: 'Object representing the Base Entity'})
export abstract class BaseEntity {
  @Field({nullable: true})
  @PrimaryGeneratedColumn()
  id?: number;

  @Field({nullable: true})
  @Column({type: 'boolean', default: true})
  isActive?: boolean;

  @Field({nullable: true})
  @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
  createDateTime?: Date;

  @Field({nullable: true})
  @UpdateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
  lastChangedDateTime?: Date;
}
