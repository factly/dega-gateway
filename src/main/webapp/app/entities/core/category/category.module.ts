import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from 'app/shared';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoryComponent, CategoryDetailComponent, CategoryUpdateComponent, categoryRoute } from './';

const ENTITY_STATES = [...categoryRoute];

@NgModule({
    imports: [
        GatewaySharedModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        ReactiveFormsModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [CategoryComponent, CategoryDetailComponent, CategoryUpdateComponent],
    entryComponents: [CategoryComponent, CategoryUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCategoryModule {}
