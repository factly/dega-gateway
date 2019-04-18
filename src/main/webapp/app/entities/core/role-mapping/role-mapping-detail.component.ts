import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRoleMapping } from 'app/shared/model/core/role-mapping.model';

@Component({
    selector: 'jhi-role-mapping-detail',
    templateUrl: './role-mapping-detail.component.html'
})
export class RoleMappingDetailComponent implements OnInit {
    roleMapping: IRoleMapping;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ roleMapping }) => {
            this.roleMapping = roleMapping;
        });
    }

    previousState() {
        window.history.back();
    }
}
