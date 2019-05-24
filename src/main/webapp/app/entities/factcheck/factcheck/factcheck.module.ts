import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {
    FactcheckComponent,
    FactcheckDetailComponent,
    FactcheckUpdateComponent,
    FactcheckDeletePopupComponent,
    FactcheckDeleteDialogComponent,
    factcheckRoute,
    factcheckPopupRoute
} from './';

const ENTITY_STATES = [...factcheckRoute, ...factcheckPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES), ReactiveFormsModule, MatDialogModule],
    declarations: [
        FactcheckComponent,
        FactcheckDetailComponent,
        FactcheckUpdateComponent,
        FactcheckDeleteDialogComponent,
        FactcheckDeletePopupComponent
    ],
    entryComponents: [FactcheckComponent, FactcheckUpdateComponent, FactcheckDeleteDialogComponent, FactcheckDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFactcheckModule {}
