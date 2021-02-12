import {Args, Int, Query, Mutation, Resolver } from '@nestjs/graphql';
import {CatsService} from "./cats.service";
import {GetCatArgs} from "./dto/get-cat.args";
import {Cat} from "./cat.entity";
import {NewCatInput} from "./dto/new-cat.input";
import {UpdateCatInput} from "./dto/update-cat.input";
import {CatsPaginatedResponse} from "./dto/cats-paginated-response";
import {CatsPaginationArgs} from "./dto/cats-pagination.args";
import {BaseResolver} from "../shared/resolvers/base.resolver";

@Resolver(of => Cat)
export class CatsResolver extends BaseResolver(Cat){
    constructor(
        private readonly catsService: CatsService,
    ) {
        super();
    }

    @Query(returns => Cat, {name: 'cat', nullable: true })
    async getCat(@Args('id', { type: () => Int }) id: number): Promise<Cat> {
        return this.catsService.findById(id);
    }

    @Query(returns => [Cat], {name: 'cats' })
    async getCats(@Args() args: GetCatArgs): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Query(returns => CatsPaginatedResponse, {name: 'cats_paginate' })
    async getPaginateCats(@Args() args: CatsPaginationArgs): Promise<CatsPaginatedResponse> {
        return this.catsService.getAllPaginate(args);
    }

    @Mutation(returns => Cat)
    async addCat(
        @Args('newCatData') newCatData: NewCatInput,
    ): Promise<Cat> {
        return this.catsService.create(newCatData);
        // pubSub.publish('recipeAdded', { recipeAdded: recipe });
        // return recipe;
    }

    @Mutation(returns => Cat, {nullable: true, description: 'Update a cat and return the object.'})
    async updateCat(
        @Args({name: 'id', type: () => Int}) id: number,
        @Args('input') catInput: UpdateCatInput,
    ): Promise<Cat> {
        try {
            return await this.catsService.update(id, catInput);
        } catch (e) {
            throw new Error(`Error in Resolver to update cat: ${e}`);
        }
    }

    @Query(returns => Boolean)
    async removeCat(@Args('id', { type: () => Int }) id: number) {
        return this.catsService.delete(id);
    }


    // @ResolveField('posts', returns => [Post])
    // async posts(@Parent() cat: Cat) {
    //     const { id } = cat;
    //     return this.postsService.findAll({ authorId: id });
    // }
}
