import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRoleMapping } from 'app/shared/model/core/role-mapping.model';
import { RoleMappingService } from './role-mapping.service';
import { IOrganization } from 'app/shared/model/core/organization.model';
import { OrganizationService } from 'app/entities/core/organization';
import { IRole } from 'app/shared/model/core/role.model';
import { RoleService } from 'app/entities/core/role';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { DegaUserService } from 'app/entities/core/dega-user';

@Component({
    selector: 'jhi-role-mapping-update',
    templateUrl: './role-mapping-update.component.html'
})
export class RoleMappingUpdateComponent implements OnInit {
    roleMapping: IRoleMapping;
    isSaving: boolean;

    organizations: IOrganization[];

    roles: IRole[];

    degausers: IDegaUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private roleMappingService: RoleMappingService,
        private organizationService: OrganizationService,
        private roleService: RoleService,
        private degaUserService: DegaUserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ roleMapping }) => {
            this.roleMapping = roleMapping;
        });
        this.organizationService.query().subscribe(
            (res: HttpResponse<IOrganization[]>) => {
                this.organizations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.roleService.query().subscribe(
            (res: HttpResponse<IRole[]>) => {
                this.roles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.roleMapping.id !== undefined) {
            this.subscribeToSaveResponse(this.roleMappingService.update(this.roleMapping));
        } else {
            this.subscribeToSaveResponse(this.roleMappingService.create(this.roleMapping));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRoleMapping>>) {
        result.subscribe((res: HttpResponse<IRoleMapping>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOrganizationById(index: number, item: IOrganization) {
        return item.id;
    }

    trackRoleById(index: number, item: IRole) {
        return item.id;
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
}
