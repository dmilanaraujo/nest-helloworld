import {User} from "../users/schemas/user.schema";
import {Dashboard} from "../dashboard/schemas/dashboard.schema";
import {Graphic} from "../dashboard/schemas/graphic.schema";
import {Park} from "../parks/schemas/park.schema";
import {Role, RoleDocument} from "../roles/schemas/role.schema";
import {Ability, AbilityBuilder, AbilityClass} from "@casl/ability";
import {Injectable} from "@nestjs/common";
import {ExtractSubjectType} from "@casl/ability/dist/types/types";
import {Model} from "mongoose";
import {ActionsService} from "../roles/actions.service";

type Subjects = typeof User | Role | Dashboard | Graphic | Park | 'all';
export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    constructor(
        private readonly actionsService: ActionsService,
    ) {}
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<
            Ability<[Action, Subjects]>
            >(Ability as AbilityClass<AppAbility>);

        // if (user.isAdmin) {
        //     can(Action.Manage, 'all'); // read-write access to everything
        // } else {
        //     can(Action.Read, 'all'); // read-only access to everything
        // }
        //
        // can(Action.Update, Article, { authorId: user.id });
        // cannot(Action.Delete, Article, { isPublished: true });

        return build({
            // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
            detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
        });
    }
}
