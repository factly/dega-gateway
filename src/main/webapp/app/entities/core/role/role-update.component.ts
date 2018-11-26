import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRole } from 'app/shared/model/core/role.model';
import { RoleService } from './role.service';

@Component({
    selector: 'jhi-role-update',
    templateUrl: './role-update.component.html'
})
export class RoleUpdateComponent implements OnInit {
    role: IRole;
    isSaving: boolean;
    createdDate: string;

    constructor(private roleService: RoleService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ role }) => {
            this.role = role;
            this.createdDate = this.role.createdDate != null ? this.role.createdDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.role.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
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
}
