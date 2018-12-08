import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Status } from 'app/shared/model/core/status.model';
import { StatusService } from './status.service';
import { StatusComponent } from './status.component';
import { StatusDetailComponent } from './status-detail.component';
import { StatusUpdateComponent } from './status-update.component';
import { StatusDeletePopupComponent } from './status-delete-dialog.component';
import { IStatus } from 'app/shared/model/core/status.model';

@Injectable({ providedIn: 'root' })
export class StatusResolve implements Resolve<IStatus> {
    constructor(private service: StatusService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Status> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Status>) => response.ok),
                map((status: HttpResponse<Status>) => status.body)
            );
        }
        return of(new Status());
    }
}

export const statusRoute: Routes = [
    {
        path: 'status',
        component: StatusComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'created_date,desc',
            pageTitle: 'gatewayApp.coreStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'status/:id/view',
        component: StatusDetailComponent,
        resolve: {
            status: StatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.coreStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'status/new',
        component: StatusUpdateComponent,
        resolve: {
            status: StatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.coreStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'status/:id/edit',
        component: StatusUpdateComponent,
        resolve: {
            status: StatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.coreStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const statusPopupRoute: Routes = [
    {
        path: 'status/:id/delete',
        component: StatusDeletePopupComponent,
        resolve: {
            status: StatusResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.coreStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
