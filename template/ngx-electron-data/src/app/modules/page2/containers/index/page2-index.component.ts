import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../models/user';
import {select, Store} from '@ngrx/store';
import {DeleteUser} from '../../../../actions/user.action';
import {getAllUsers} from '../../../../reducers/user.reducer';
import {NgxElectronDataService} from '@ngx-electron/data';

@Component({
  selector: 'app-page2',
  templateUrl: './page2-index.component.html'
})
export class Page2IndexComponent implements OnInit {
  title = 'page2';
    users$: Observable<User[]>;

    constructor(private store$: Store,
                private electronDataService: NgxElectronDataService) {}

    ngOnInit(): void {
        this.users$ = this.store$.pipe(
            select(getAllUsers)
        );
    }

    updateUser(id: number) {

    }

    deleteUser(id: number) {
        this.electronDataService.dispatch(new DeleteUser(id))
    }
}
