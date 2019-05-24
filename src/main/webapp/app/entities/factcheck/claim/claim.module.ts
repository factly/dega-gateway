import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import { MatDialogModule } from '@angular/material/dialog';
import {
    ClaimComponent,
    ClaimDetailComponent,
    ClaimDeletePopupComponent,
    ClaimDeleteDialogComponent,
    NewClaimPopupComponent,
    claimRoute,
    claimPopupRoute
} from './';

const ENTITY_STATES = [...claimRoute, ...claimPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES), MatDialogModule],
    declarations: [ClaimComponent, ClaimDetailComponent, ClaimDeleteDialogComponent, ClaimDeletePopupComponent, NewClaimPopupComponent],
    entryComponents: [ClaimComponent, ClaimDeleteDialogComponent, ClaimDeletePopupComponent, NewClaimPopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayClaimModule {}
