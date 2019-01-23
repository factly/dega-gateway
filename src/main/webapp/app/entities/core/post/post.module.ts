import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import { QuillModule } from 'ngx-quill';
import {
    PostComponent,
    PostDetailComponent,
    PostUpdateComponent,
    PostDeletePopupComponent,
    PostDeleteDialogComponent,
    postRoute,
    postPopupRoute
} from './';
import { FeaturedMediaUploadPopupComponent } from './featured-media-upload-dialog.component';
import { FeaturedMediaUploadDialogComponent } from './featured-media-upload-dialog.component';

const ENTITY_STATES = [...postRoute, ...postPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, QuillModule, RouterModule.forChild(ENTITY_STATES)],
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
