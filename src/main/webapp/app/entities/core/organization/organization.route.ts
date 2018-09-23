import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organization } from 'app/shared/model/core/organization.model';
import { OrganizationService } from './organization.service';
import { OrganizationComponent } from './organization.component';
import { OrganizationDetailComponent } from './organization-detail.component';
import { OrganizationUpdateComponent } from './organization-update.component';
import { OrganizationDeletePopupComponent } from './organization-delete-dialog.component';
import { IOrganization } from 'app/shared/model/core/organization.model';

@Injectable({ providedIn: 'root' })
export class OrganizationResolve implements Resolve<IOrganization> {
    constructor(private service: OrganizationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((organization: HttpResponse<Organization>) => organization.body));
        }
        return of(new Organization());
    }
}

export const organizationRoute: Routes = [
    {
        path: 'organization',
        component: OrganizationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gatewayApp.coreOrganization.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'organization/:id/view',
        component: OrganizationDetailComponent,
        resolve: {
            organization: OrganizationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.coreOrganization.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'organization/new',
        component: OrganizationUpdateComponent,
        resolve: {
            organization: OrganizationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.coreOrganization.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'organization/:id/edit',
        component: OrganizationUpdateComponent,
        resolve: {
            organization: OrganizationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.coreOrganization.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organizationPopupRoute: Routes = [
    {
        path: 'organization/:id/delete',
        component: OrganizationDeletePopupComponent,
        resolve: {
            organization: OrganizationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.coreOrganization.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
