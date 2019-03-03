import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRole } from 'app/shared/model/core/role.model';
import { RoleService } from './role.service';
import { Principal, Account } from 'app/core';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { DegaUserService } from 'app/entities/core/dega-user';
import { JhiAlertService } from 'ng-jhipster';
import { ADMIN_ROLE } from 'app/shared/constants/role.constants';

@Component({
    selector: 'jhi-role-update',
    templateUrl: './role-update.component.html'
})
export class RoleUpdateComponent implements OnInit {
    role: IRole;
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
        private roleService: RoleService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private degaUserService: DegaUserService,
        private principal: Principal
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ role }) => {
            this.role = role;
            this.createdDate = this.role.createdDate != null ? this.role.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.role.lastUpdatedDate != null ? this.role.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
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
        this.role.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.role.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        if (this.role.id !== undefined) {
            this.subscribeToSaveResponse(this.roleService.update(this.role));
        } else {
            this.subscribeToSaveResponse(this.roleService.create(this.role));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRole>>) {
        result.subscribe((res: HttpResponse<IRole>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    bindSlug(event: any) {
        if (this.role.id === undefined) {
            this.slugExtention = 0;
            this.slug = event.target.value
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-')
                .toLowerCase();
            this.tempSlug = this.slug;
            this.createSlug();
        }
    }
    createSlug() {
        if (this.slug) {
            this.roleService.getRoleBySlug(this.slug).subscribe((res: HttpResponse<IRole>) => {
                if (res.body) {
                    this.slugExtention += 1;
                    this.slug = this.tempSlug + this.slugExtention;
                    this.createSlug();
                }
                this.role.slug = this.slug;
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
