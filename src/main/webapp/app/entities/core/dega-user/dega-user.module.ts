import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {
    DegaUserComponent,
    DegaUserDetailComponent,
    DegaUserUpdateComponent,
    DegaUserDeletePopupComponent,
    DegaUserDeleteDialogComponent,
    degaUserRoute,
    degaUserPopupRoute
} from './';

const ENTITY_STATES = [...degaUserRoute, ...degaUserPopupRoute];

@NgModule({
    imports: [
        GatewaySharedModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DegaUserComponent,
        DegaUserDetailComponent,
        DegaUserUpdateComponent,
        DegaUserDeleteDialogComponent,
        DegaUserDeletePopupComponent
    ],
    entryComponents: [DegaUserComponent, DegaUserUpdateComponent, DegaUserDeleteDialogComponent, DegaUserDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDegaUserModule {}
