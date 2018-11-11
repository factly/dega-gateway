import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    ClaimantComponent,
    ClaimantDetailComponent,
    ClaimantUpdateComponent,
    ClaimantDeletePopupComponent,
    ClaimantDeleteDialogComponent,
    claimantRoute,
    claimantPopupRoute
} from './';

const ENTITY_STATES = [...claimantRoute, ...claimantPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ClaimantComponent,
        ClaimantDetailComponent,
        ClaimantUpdateComponent,
        ClaimantDeleteDialogComponent,
        ClaimantDeletePopupComponent
    ],
    entryComponents: [ClaimantComponent, ClaimantUpdateComponent, ClaimantDeleteDialogComponent, ClaimantDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayClaimantModule {}
