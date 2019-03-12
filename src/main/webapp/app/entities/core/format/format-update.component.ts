import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IFormat } from 'app/shared/model/core/format.model';
import { FormatService } from './format.service';
import { Principal, Account } from 'app/core';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { DegaUserService } from 'app/entities/core/dega-user';
import { JhiAlertService } from 'ng-jhipster';
import { ADMIN_ROLE } from 'app/shared/constants/role.constants';

@Component({
    selector: 'jhi-format-update',
    templateUrl: './format-update.component.html'
})
export class FormatUpdateComponent implements OnInit {
    format: IFormat;
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
        private formatService: FormatService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private degaUserService: DegaUserService,
        private principal: Principal
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ format }) => {
            this.format = format;
            this.createdDate = this.format.createdDate != null ? this.format.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.format.lastUpdatedDate != null ? this.format.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
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
        this.format.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.format.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        if (this.format.id !== undefined) {
            this.subscribeToSaveResponse(this.formatService.update(this.format));
        } else {
            this.subscribeToSaveResponse(this.formatService.create(this.format));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFormat>>) {
        result.subscribe((res: HttpResponse<IFormat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    bindSlug(event: any) {
        if (this.format.id === undefined) {
            this.slugExtention = 0;
            this.slug = event.target.value
                .replace(/[;/?:@=&"<>#%{}|\^~$-`“‘]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .toLowerCase();
            this.tempSlug = this.slug;
            this.createSlug();
        }
    }
    createSlug() {
        if (this.slug) {
            this.formatService.getFormatBySlug(this.slug).subscribe((res: HttpResponse<IFormat>) => {
                if (res.body) {
                    this.slugExtention += 1;
                    this.slug = this.tempSlug + this.slugExtention;
                    this.createSlug();
                }
                this.format.slug = this.slug;
            });
        }
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    showField(degausersRole: String): boolean {
        return ADMIN_ROLE.includes(degausersRole);
    }
}
