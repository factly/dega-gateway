import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DegaUser } from 'app/shared/model/core/dega-user.model';
import { DegaUserService } from './dega-user.service';
import { DegaUserComponent } from './dega-user.component';
import { DegaUserDetailComponent } from './dega-user-detail.component';
import { DegaUserUpdateComponent } from './dega-user-update.component';
import { DegaUserDeletePopupComponent } from './dega-user-delete-dialog.component';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';

@Injectable({ providedIn: 'root' })
export class DegaUserResolve implements Resolve<IDegaUser> {
    constructor(private service: DegaUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DegaUser> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DegaUser>) => response.ok),
                map((degaUser: HttpResponse<DegaUser>) => degaUser.body)
            );
        }
        return of(new DegaUser());
    }
}

export const degaUserRoute: Routes = [
    {
        path: 'dega-user',
        component: DegaUserComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            defaultSort: 'createdDate,desc',
            pageTitle: 'gatewayApp.coreDegaUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dega-user/:id/view',
        component: DegaUserDetailComponent,
        resolve: {
            degaUser: DegaUserResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            pageTitle: 'gatewayApp.coreDegaUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dega-user/new',
        component: DegaUserUpdateComponent,
        resolve: {
            degaUser: DegaUserResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            pageTitle: 'gatewayApp.coreDegaUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dega-user/:id/edit',
        component: DegaUserUpdateComponent,
        resolve: {
            degaUser: DegaUserResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            pageTitle: 'gatewayApp.coreDegaUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const degaUserPopupRoute: Routes = [
    {
        path: 'dega-user/:id/delete',
        component: DegaUserDeletePopupComponent,
        resolve: {
            degaUser: DegaUserResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            pageTitle: 'gatewayApp.coreDegaUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
