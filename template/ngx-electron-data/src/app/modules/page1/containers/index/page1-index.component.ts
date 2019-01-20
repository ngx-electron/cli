import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../models/user';
import {NgxElectronDataService} from '@ngx-electron/data';
import {select, Store} from '@ngrx/store';
import {getAllUsers} from '../../../../reducers/user.reducer';
import {DeleteUser, LoadUserList, LoadUserListSuccess} from '../../../../actions/user.action';
import {map, take} from 'rxjs/operators';

@Component({
    selector: 'app-page1',
    templateUrl: './page1-index.component.html'
})
export class Page1IndexComponent implements OnInit {
    title = 'page1';
    users$: Observable<User[]>;

    constructor(private store$: Store,
                private electronDataService: NgxElectronDataService) {}

    ngOnInit(): void {
        this.store$.dispatch(new LoadUserList());
        this.users$ = this.store$.pipe(
            select(getAllUsers)
        );
    }

    updateUser(id: number) {

    }

    deleteUser(id: number) {
        this.electronDataService.dispatch(new DeleteUser(id))
    }

    openPage2() {
        // 打开页面并把所有的user数据传输过去
        this.electronDataService.openPage('page2', {
            width: 1024,
            height: 768
        }, {
            actions: [
                this.store$.pipe(
                    select(getAllUsers),
                    map(users => new LoadUserListSuccess(users)),
                    take(1)
                )
            ]
        });
    }
}
