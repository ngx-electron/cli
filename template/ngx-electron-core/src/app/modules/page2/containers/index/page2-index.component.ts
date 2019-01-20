import {Component, OnInit} from '@angular/core';
import {NgxElectronService} from '@Ngx-electron/core';

@Component({
    selector: 'app-page2',
    templateUrl: './page2-index.component.html'
})
export class Page2IndexComponent implements OnInit {
    title = 'page2';

    initData: string;

    constructor(private electronService: NgxElectronService) {}

    ngOnInit(): void {
        this.initData = this.electronService.initData;
    }
}
