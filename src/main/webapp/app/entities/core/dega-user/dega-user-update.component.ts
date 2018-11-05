import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { DegaUserService } from './dega-user.service';
import { IRole } from 'app/shared/model/core/role.model';
import { RoleService } from 'app/entities/core/role';

@Component({
    selector: 'jhi-dega-user-update',
    templateUrl: './dega-user-update.component.html'
})
export class DegaUserUpdateComponent implements OnInit {
    degaUser: IDegaUser;
    isSaving: boolean;

    roles: IRole[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private degaUserService: DegaUserService,
        private roleService: RoleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ degaUser }) => {
            this.degaUser = degaUser;
        });
        this.roleService.query().subscribe(
            (res: HttpResponse<IRole[]>) => {
                this.roles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.degaUser.id !== undefined) {
            this.subscribeToSaveResponse(this.degaUserService.update(this.degaUser));
        } else {
            this.subscribeToSaveResponse(this.degaUserService.create(this.degaUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDegaUser>>) {
        result.subscribe((res: HttpResponse<IDegaUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRoleById(index: number, item: IRole) {
        return item.id;
    }
}
