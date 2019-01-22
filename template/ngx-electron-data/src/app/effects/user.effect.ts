import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {LoadUserList, LoadUserListSuccess, UserActionTypes} from '../actions/user.action';
import {of} from 'rxjs';

@Injectable()
export class UserEffect {

    @Effect()
    loadUserList$ = this.actions$.pipe(
        ofType<LoadUserList>(UserActionTypes.LOAD_USER_LIST),
        switchMap(() => of([{
            id: 0,
            name: 'liangshen',
            sort: 1
        }, {
            id: 1,
            name: 'liangshen2',
            sort: 2
        }])),
        map(users => new LoadUserListSuccess(users))
    );


    constructor(private actions$: Actions) {}
}
