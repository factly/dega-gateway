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
    FormatComponent,
    FormatDetailComponent,
    FormatUpdateComponent,
    FormatDeletePopupComponent,
    FormatDeleteDialogComponent,
    formatRoute,
    formatPopupRoute
} from './';

const ENTITY_STATES = [...formatRoute, ...formatPopupRoute];

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
    declarations: [FormatComponent, FormatDetailComponent, FormatUpdateComponent, FormatDeleteDialogComponent, FormatDeletePopupComponent],
    entryComponents: [FormatComponent, FormatUpdateComponent, FormatDeleteDialogComponent, FormatDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormatModule {}
