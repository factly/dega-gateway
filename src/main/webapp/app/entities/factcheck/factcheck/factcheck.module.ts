import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        FormsModule,
        DragDropModule,
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatDialogModule
    ],
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
