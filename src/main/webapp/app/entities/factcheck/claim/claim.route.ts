import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Claim } from 'app/shared/model/factcheck/claim.model';
import { ClaimService } from './claim.service';
import { ClaimComponent } from './claim.component';
import { ClaimDetailComponent } from './claim-detail.component';
import { IClaim } from 'app/shared/model/factcheck/claim.model';

@Injectable({ providedIn: 'root' })
export class ClaimResolve implements Resolve<IClaim> {
    constructor(private service: ClaimService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Claim> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Claim>) => response.ok),
                map((claim: HttpResponse<Claim>) => claim.body)
            );
        }
        return of(new Claim());
    }
}

export const claimRoute: Routes = [
    {
        path: 'claim',
        component: ClaimComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_ADMINISTRATOR', 'ROLE_EDITOR', 'ROLE_AUTHOR'],
            defaultSort: 'createdDate,desc',
            pageTitle: 'gatewayApp.factcheckClaim.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'claim/:id/view',
        component: ClaimDetailComponent,
        resolve: {
            claim: ClaimResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_ADMINISTRATOR', 'ROLE_EDITOR', 'ROLE_AUTHOR'],
            pageTitle: 'gatewayApp.factcheckClaim.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
