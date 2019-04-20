import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RoleMapping } from 'app/shared/model/core/role-mapping.model';
import { RoleMappingService } from './role-mapping.service';
import { RoleMappingComponent } from './role-mapping.component';
import { RoleMappingDetailComponent } from './role-mapping-detail.component';
import { RoleMappingUpdateComponent } from './role-mapping-update.component';
import { RoleMappingDeletePopupComponent } from './role-mapping-delete-dialog.component';
import { IRoleMapping } from 'app/shared/model/core/role-mapping.model';

@Injectable({ providedIn: 'root' })
export class RoleMappingResolve implements Resolve<IRoleMapping> {
    constructor(private service: RoleMappingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoleMapping> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RoleMapping>) => response.ok),
                map((roleMapping: HttpResponse<RoleMapping>) => roleMapping.body)
            );
        }
        return of(new RoleMapping());
    }
}

export const roleMappingRoute: Routes = [
    {
        path: 'role-mapping',
        component: RoleMappingComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gatewayApp.coreRoleMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'role-mapping/:id/view',
        component: RoleMappingDetailComponent,
        resolve: {
            roleMapping: RoleMappingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.coreRoleMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'role-mapping/new',
        component: RoleMappingUpdateComponent,
        resolve: {
            roleMapping: RoleMappingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.coreRoleMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'role-mapping/:id/edit',
        component: RoleMappingUpdateComponent,
        resolve: {
            roleMapping: RoleMappingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.coreRoleMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roleMappingPopupRoute: Routes = [
    {
        path: 'role-mapping/:id/delete',
        component: RoleMappingDeletePopupComponent,
        resolve: {
            roleMapping: RoleMappingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.coreRoleMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
