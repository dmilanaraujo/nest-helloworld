import {Resolver, Query} from '@nestjs/graphql';
import {Type} from "@nestjs/common";

/**
 * Example of property and Query
 * protected items: T[] = [];
 * @Query(type => [objectTypeCls], { name: `getAll${suffix}` })
 * async getAll(@Arg("first", type => Int) first: number): Promise<T[]> {
 *  return this.items.slice(0, first);
 * }
 *
 */
export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
    @Resolver({ isAbstract: true })
    abstract class BaseResolverHost {
        @Query((type) => [classRef], { name: `findAll${classRef.name}` })
        async findAll(): Promise<T[]> {
            return [];
        }
    }
    return BaseResolverHost;
}
