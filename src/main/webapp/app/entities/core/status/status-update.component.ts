import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IStatus } from 'app/shared/model/core/status.model';
import { StatusService } from './status.service';
import { Principal, Account } from 'app/core';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { DegaUserService } from 'app/entities/core/dega-user';
import { JhiAlertService } from 'ng-jhipster';
import { ADMIN_ROLE } from 'app/shared/constants/role.constants';

@Component({
    selector: 'jhi-status-update',
    templateUrl: './status-update.component.html'
})
export class StatusUpdateComponent implements OnInit {
    status: IStatus;
    isSaving: boolean;
    createdDate: string;
    lastUpdatedDate: string;
    slug: string;
    slugExtention: number;
    tempSlug: string;
    degausers: IDegaUser[];
    show: boolean;
    currentUser: IDegaUser;
    account: Account;

    constructor(
        private jhiAlertService: JhiAlertService,
        private statusService: StatusService,
        private activatedRoute: ActivatedRoute,
        private degaUserService: DegaUserService,
        private principal: Principal
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ status }) => {
            this.status = status;
            this.createdDate = this.status.createdDate != null ? this.status.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.status.lastUpdatedDate != null ? this.status.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.degaUserService.query().subscribe(
            (res: HttpResponse<IDegaUser[]>) => {
                this.degausers = res.body;
                this.currentUser = this.degausers.filter(u => u.email === this.account.email).shift();
                this.show = this.showField(this.currentUser.roleName);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.status.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.status.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        if (this.status.id !== undefined) {
            delete this.status['clientId']; // Need to find a better way to do this
            this.subscribeToSaveResponse(this.statusService.update(this.status));
        } else {
            this.subscribeToSaveResponse(this.statusService.create(this.status));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStatus>>) {
        result.subscribe((res: HttpResponse<IStatus>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    showField(degausersRole: String): boolean {
        return ADMIN_ROLE.includes(degausersRole);
    }
}
