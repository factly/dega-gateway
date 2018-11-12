import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FactCheck } from 'app/shared/model/factcheck/fact-check.model';
import { FactCheckService } from './fact-check.service';
import { FactCheckComponent } from './fact-check.component';
import { FactCheckDetailComponent } from './fact-check-detail.component';
import { FactCheckUpdateComponent } from './fact-check-update.component';
import { FactCheckDeletePopupComponent } from './fact-check-delete-dialog.component';
import { IFactCheck } from 'app/shared/model/factcheck/fact-check.model';

@Injectable({ providedIn: 'root' })
export class FactCheckResolve implements Resolve<IFactCheck> {
    constructor(private service: FactCheckService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FactCheck> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FactCheck>) => response.ok),
                map((factCheck: HttpResponse<FactCheck>) => factCheck.body)
            );
        }
        return of(new FactCheck());
    }
}

export const factCheckRoute: Routes = [
    {
        path: 'fact-check',
        component: FactCheckComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gatewayApp.factcheckFactCheck.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fact-check/:id/view',
        component: FactCheckDetailComponent,
        resolve: {
            factCheck: FactCheckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.factcheckFactCheck.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fact-check/new',
        component: FactCheckUpdateComponent,
        resolve: {
            factCheck: FactCheckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.factcheckFactCheck.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fact-check/:id/edit',
        component: FactCheckUpdateComponent,
        resolve: {
            factCheck: FactCheckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.factcheckFactCheck.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const factCheckPopupRoute: Routes = [
    {
        path: 'fact-check/:id/delete',
        component: FactCheckDeletePopupComponent,
        resolve: {
            factCheck: FactCheckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.factcheckFactCheck.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
