import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import { MediaComponent, MediaDetailComponent, MediaUpdateComponent, mediaRoute, mediaPopupRoute } from './';
import { MediaUploadPopupComponent } from './media-upload-dialog.component';
import { MediaUploadDialogComponent } from './media-upload-dialog.component';

const ENTITY_STATES = [...mediaRoute, ...mediaPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MediaComponent, MediaDetailComponent, MediaUpdateComponent, MediaUploadDialogComponent, MediaUploadPopupComponent],
    entryComponents: [MediaComponent, MediaUpdateComponent, MediaUploadDialogComponent, MediaUploadPopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMediaModule {}
