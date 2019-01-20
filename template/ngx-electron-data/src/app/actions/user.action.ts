import {Action} from '@ngrx/store';
import {User} from '../models/user';


export enum UserActionTypes {
    LOAD_USER_LIST = '[user] load user list',
    LOAD_USER_LIST_SUCCESS = '[user] load user list success',
    DELETE_USER = '[user] delete user'
}

export class LoadUserList implements Action {
    readonly type = UserActionTypes.LOAD_USER_LIST;
}
export class LoadUserListSuccess implements Action {
    readonly type = UserActionTypes.LOAD_USER_LIST_SUCCESS;
    constructor(public payload: User[]) {}
}
export class DeleteUser implements Action {
    readonly type = UserActionTypes.DELETE_USER;
    constructor(public payload: number) {}
}

export type UserAction = LoadUserListSuccess | LoadUserList | DeleteUser;
