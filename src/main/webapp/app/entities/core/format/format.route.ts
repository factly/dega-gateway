import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Format } from 'app/shared/model/core/format.model';
import { FormatService } from './format.service';
import { FormatComponent } from './format.component';
import { FormatDetailComponent } from './format-detail.component';
import { FormatUpdateComponent } from './format-update.component';
import { IFormat } from 'app/shared/model/core/format.model';

@Injectable({ providedIn: 'root' })
export class FormatResolve implements Resolve<IFormat> {
    constructor(private service: FormatService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Format> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Format>) => response.ok),
                map((format: HttpResponse<Format>) => format.body)
            );
        }
        return of(new Format());
    }
}

export const formatRoute: Routes = [
    {
        path: 'format',
        component: FormatComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            defaultSort: 'createdDate,desc',
            pageTitle: 'gatewayApp.coreFormat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'format/:id/view',
        component: FormatDetailComponent,
        resolve: {
            format: FormatResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            pageTitle: 'gatewayApp.coreFormat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'format/new',
        component: FormatUpdateComponent,
        resolve: {
            format: FormatResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            pageTitle: 'gatewayApp.coreFormat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'format/:id/edit',
        component: FormatUpdateComponent,
        resolve: {
            format: FormatResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            pageTitle: 'gatewayApp.coreFormat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
