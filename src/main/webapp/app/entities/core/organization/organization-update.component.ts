import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IOrganization } from 'app/shared/model/core/organization.model';
import { OrganizationService } from './organization.service';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { DegaUserService } from 'app/entities/core/dega-user';

@Component({
    selector: 'jhi-organization-update',
    templateUrl: './organization-update.component.html'
})
export class OrganizationUpdateComponent implements OnInit {
    organization: IOrganization;
    isSaving: boolean;

    degausers: IDegaUser[];
    createdDate: string;
    lastUpdatedDate: string;
    slug: string;
    slugExtention: number;
    tempSlug: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private organizationService: OrganizationService,
        private degaUserService: DegaUserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ organization }) => {
            this.organization = organization;
            this.createdDate = this.organization.createdDate != null ? this.organization.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate =
                this.organization.lastUpdatedDate != null ? this.organization.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.degaUserService.query().subscribe(
            (res: HttpResponse<IDegaUser[]>) => {
                this.degausers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.organization.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.organization.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        if (this.organization.id !== undefined) {
            this.subscribeToSaveResponse(this.organizationService.update(this.organization));
        } else {
            this.subscribeToSaveResponse(this.organizationService.create(this.organization));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrganization>>) {
        result.subscribe((res: HttpResponse<IOrganization>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDegaUserById(index: number, item: IDegaUser) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    bindSlug(event: any) {
        this.slugExtention = 0;
        this.slug = event.target.value.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
        this.tempSlug = this.slug;
        this.createSlug();
    }
    createSlug() {
        if (this.slug) {
            this.organizationService.getOrganizationBySlug(this.slug).subscribe((res: HttpResponse<IOrganization>) => {
                if (res.body) {
                    this.slugExtention += 1;
                    this.slug = this.tempSlug + this.slugExtention;
                    this.createSlug();
                }
                this.organization.slug = this.slug;
            });
        }
    }
}
