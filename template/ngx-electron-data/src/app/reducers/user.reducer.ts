import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {User} from '../models/user';
import {UserAction, UserActionTypes} from '../actions/user.action';
import {createFeatureSelector} from '@ngrx/store';


export interface UserReducerState extends EntityState<User> {
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: user => user.id,
    sortComparer: (user1, user2) => user1.sort - user2.sort
});

export function userReducer(
    state = adapter.getInitialState(),
    action: UserAction
): UserReducerState {
    switch (action.type) {
        case UserActionTypes.LOAD_USER_LIST_SUCCESS:
            return adapter.addAll(action.payload, state);
        case UserActionTypes.DELETE_USER:
            return adapter.removeOne(action.payload, state);
        case UserActionTypes.UPDATE_USER:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    ...action.payload
                }
            }, state);
        case UserActionTypes.ADD_USER:
            return adapter.addOne({
                id: state.ids.length,
                ...action.payload
            }, state);
        default: {
            return state;
        }
    }
}

export const getUserState = createFeatureSelector<UserReducerState>('user');


export const {
    selectIds: getUserIdss,
    selectEntities: getUserEntities,
    selectAll: getAllUsers,
    selectTotal: getTotalUsers,
} = adapter.getSelectors(getUserState);

