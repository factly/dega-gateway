import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDegaUser } from 'app/shared/model/core/dega-user.model';

@Component({
    selector: 'jhi-dega-user-detail',
    templateUrl: './dega-user-detail.component.html'
})
export class DegaUserDetailComponent implements OnInit {
    degaUser: IDegaUser;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ degaUser }) => {
            this.degaUser = degaUser;
        });
    }

    previousState() {
        window.history.back();
    }
}
