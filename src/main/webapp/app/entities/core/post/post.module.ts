import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NgModuleRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    PostComponent,
    PostDeleteDialogComponent,
    PostDeletePopupComponent,
    PostDetailComponent,
    postPopupRoute,
    postRoute,
    PostUpdateComponent
} from './';
import {
    FeaturedMediaUploadDialogComponent,
    FeaturedMediaUploadPopupComponent
} from '../media/featured-media/featured-media-upload-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const ENTITY_STATES = [...postRoute, ...postPopupRoute];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        ReactiveFormsModule
    ],
    declarations: [
        PostComponent,
        PostDetailComponent,
        PostUpdateComponent,
        PostDeleteDialogComponent,
        PostDeletePopupComponent,
        FeaturedMediaUploadPopupComponent,
        FeaturedMediaUploadDialogComponent
    ],
    entryComponents: [
        PostComponent,
        PostUpdateComponent,
        PostDeleteDialogComponent,
        PostDeletePopupComponent,
        FeaturedMediaUploadPopupComponent,
        FeaturedMediaUploadDialogComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPostModule {}
