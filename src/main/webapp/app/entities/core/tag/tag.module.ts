import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { TagComponent, TagDetailComponent, TagUpdateComponent, tagRoute } from './';

const ENTITY_STATES = [...tagRoute];

@NgModule({
    imports: [
        FormsModule,
        GatewaySharedModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        ReactiveFormsModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [TagComponent, TagDetailComponent, TagUpdateComponent],
    entryComponents: [TagComponent, TagUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayTagModule {}
