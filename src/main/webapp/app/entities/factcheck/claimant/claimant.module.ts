import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

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
    imports: [
        GatewaySharedModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
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
