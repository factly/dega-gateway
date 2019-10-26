import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { GatewaySharedModule } from 'app/shared';
import { RatingComponent, RatingDetailComponent, RatingUpdateComponent, ratingRoute } from './';

const ENTITY_STATES = [...ratingRoute];

@NgModule({
    imports: [
        GatewaySharedModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [RatingComponent, RatingDetailComponent, RatingUpdateComponent],
    entryComponents: [RatingComponent, RatingUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayRatingModule {}
