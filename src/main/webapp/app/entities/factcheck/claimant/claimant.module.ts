import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { GatewaySharedModule } from 'app/shared';
import {
    ClaimantComponent,
    ClaimantDeleteDialogComponent,
    ClaimantDeletePopupComponent,
    ClaimantDetailComponent,
    claimantPopupRoute,
    claimantRoute,
    ClaimantUpdateComponent
} from './';

const ENTITY_STATES = [...claimantRoute, ...claimantPopupRoute];

@NgModule({
    imports: [
        GatewaySharedModule,
        MatButtonModule,
        MatDialogModule,
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
