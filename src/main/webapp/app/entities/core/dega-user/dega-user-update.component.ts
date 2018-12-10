import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { IPost } from 'app/shared/model/core/post.model';
import { PostService } from 'app/entities/core/post';

@Component({
    selector: 'jhi-dega-user-update',
    templateUrl: './dega-user-update.component.html'
})
export class DegaUserUpdateComponent implements OnInit {
    degaUser: IDegaUser;
    isSaving: boolean;

    roles: IRole[];

    organizations: IOrganization[];

    posts: IPost[];
    createdDate: string;
    slug: string;
    slugExtention: number;
    tempSlug: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private degaUserService: DegaUserService,
        private roleService: RoleService,
        private organizationService: OrganizationService,
        private postService: PostService,
        private activatedRoute: ActivatedRoute
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
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.postService.query().subscribe(
            (res: HttpResponse<IPost[]>) => {
                this.posts = res.body;
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

    trackRoleById(index: number, item: IRole) {
        return item.id;
    }

    trackOrganizationById(index: number, item: IOrganization) {
        return item.id;
    }

    trackPostById(index: number, item: IPost) {
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
            this.degaUserService.getDegaUserBySlug(this.slug).subscribe((res: HttpResponse<IDegaUser>) => {
                if (res.body) {
                    this.slugExtention += 1;
                    this.slug = this.tempSlug + this.slugExtention;
                    this.createSlug();
                }
                this.degaUser.slug = this.slug;
            });
        }
    }
}
