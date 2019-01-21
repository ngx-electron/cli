import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../models/user';
import {select, Store} from '@ngrx/store';
import {AddUser, DeleteUser, UpdateUser} from '../../../../actions/user.action';
import {getAllUsers, UserReducerState} from '../../../../reducers/user.reducer';
import {NgxElectronDataService} from '@ngx-electron/data';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html'
})
export class UserTableComponent implements OnInit {
    users$: Observable<User[]>;
    updateMap = new Map<number, User>();
    name: string;
    sort: number;

    constructor(private store$: Store<UserReducerState>,
                private electronDataService: NgxElectronDataService) {
    }

    ngOnInit(): void {
        this.users$ = this.store$.pipe(
            select(getAllUsers)
        );
    }

    cancelUpdate(id: number) {
        this.updateMap.delete(id);
    }

    modify(user: User) {
        this.updateMap.set(user.id, {...user});
    }

    update(id: number) {
        this.electronDataService.dispatch(new UpdateUser(this.updateMap.get(id)));
        this.cancelUpdate(id);
    }

    addUser() {
        this.electronDataService.dispatch(new AddUser({
            name: this.name,
            sort: +this.sort
        }))
    }

    deleteUser(id: number) {
        this.electronDataService.dispatch(new DeleteUser(id));
    }
}
