import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRole } from 'app/shared/model/core/role.model';

@Component({
    selector: 'jhi-role-detail',
    templateUrl: './role-detail.component.html'
})
export class RoleDetailComponent implements OnInit {
    role: IRole;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ role }) => {
            this.role = role;
        });
    }

    previousState() {
        window.history.back();
    }
}
