import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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

const ENTITY_STATES = [...postRoute, ...postPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES), MatTooltipModule],
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
