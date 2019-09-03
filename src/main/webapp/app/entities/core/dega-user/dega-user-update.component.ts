import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { DegaUserService } from './dega-user.service';
import { IRole } from 'app/shared/model/core/role.model';
import { RoleService } from 'app/entities/core/role';
import { IOrganization } from 'app/shared/model/core/organization.model';
import { OrganizationService } from 'app/entities/core/organization';
import { Subscription } from 'rxjs';
import { IRoleMapping } from 'app/shared/model/core/role-mapping.model';
import { RoleMappingService } from 'app/entities/core/role-mapping';
import { QuillEditorFileUploadComponent } from 'app/shared/quill-editor/quill-editor-file-upload.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'jhi-dega-user-update',
    templateUrl: './dega-user-update.component.html'
})
export class DegaUserUpdateComponent implements OnInit {
    degaUser: IDegaUser;
    isSaving: boolean;

    roles: IRole[];

    organizations: IOrganization[];

    rolemappings: IRoleMapping[];
    createdDate: string;
    slug: string;
    subscription: Subscription;

    constructor(
        private jhiAlertService: JhiAlertService,
        private degaUserService: DegaUserService,
        private roleService: RoleService,
        private organizationService: OrganizationService,
        private roleMappingService: RoleMappingService,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ degaUser }) => {
            this.degaUser = degaUser;
            this.createdDate = this.degaUser.createdDate != null ? this.degaUser.createdDate.format(DATE_TIME_FORMAT) : null;
        });
        this.roleService.query().subscribe(
            (res: HttpResponse<IRole[]>) => {
                this.roles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.organizationService.query().subscribe(
            (res: HttpResponse<IOrganization[]>) => {
                this.organizations = res.body;

                // assign default
                const orgsDegault = this.organizations.filter(o => o.id === this.degaUser.organizationDefaultId);
                this.degaUser.organizationDefault = orgsDegault.shift();

                // assign current
                const orgsCurrent = this.organizations.filter(o => o.id === this.degaUser.organizationCurrentId);
                this.degaUser.organizationCurrent = orgsCurrent.shift();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.roleMappingService.query().subscribe(
            (res: HttpResponse<IRoleMapping[]>) => {
                this.rolemappings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.degaUser.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
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

    trackOrganizationById(index: number, item: IOrganization) {
        return item.id;
    }

    trackRoleMappingById(index: number, item: IRoleMapping) {
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

    choseMediaforProfilePicture() {
        const config = {
            height: '90%',
            width: '90vw',
            maxWidth: '90vw'
        };
        const dialogRef = this.dialog.open(QuillEditorFileUploadComponent, config);

        dialogRef.afterClosed().subscribe(imageData => {
            if (imageData) {
                this.updateMediaForProfilePicture(imageData);
            }
        });
    }
    updateMediaForProfilePicture(imageData) {
        this.degaUser.mediaDTO = imageData;
    }
}
