import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStatus } from 'app/shared/model/core/status.model';

@Component({
    selector: 'jhi-status-detail',
    templateUrl: './status-detail.component.html'
})
export class StatusDetailComponent implements OnInit {
    status: IStatus;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ status }) => {
            this.status = status;
        });
    }

    previousState() {
        window.history.back();
    }
}
