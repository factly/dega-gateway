import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { ClaimSearchComponent } from './claim-search.component';

export const claimSearchRoute: Routes = [
    {
        path: 'claim-search',
        component: ClaimSearchComponent,
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'createdDate,desc',
            pageTitle: 'gatewayApp.factcheckClaim.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
