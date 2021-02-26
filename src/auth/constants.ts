import {SetMetadata} from "@nestjs/common";

export const jwtConstants = {
    secret: 'mySecretKey',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

export interface IActionDef {
    name:string;
    description?: string
}
export const ACTION_NAME = 'actionName';
export const ACTION_DESCRIPTION = 'actionDescription';
export const ActionDef = (name:string) => SetMetadata(ACTION_NAME, name);
// export const ActionDef = (data: IActionDef) => {
//     SetMetadata(ACTION_NAME, data.name);
//     if (data.description) {
//         SetMetadata(ACTION_DESCRIPTION, data.description);
//     }
// };
