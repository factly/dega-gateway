import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrganization } from 'app/shared/model/core/organization.model';

@Component({
    selector: 'jhi-organization-detail',
    templateUrl: './organization-detail.component.html'
})
export class OrganizationDetailComponent implements OnInit {
    organization: IOrganization;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ organization }) => {
            this.organization = organization;
        });
    }

    previousState() {
        window.history.back();
    }
}
