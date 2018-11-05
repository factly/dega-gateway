import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    MediaComponent,
    MediaDetailComponent,
    MediaUpdateComponent,
    MediaDeletePopupComponent,
    MediaDeleteDialogComponent,
    mediaRoute,
    mediaPopupRoute
} from './';

const ENTITY_STATES = [...mediaRoute, ...mediaPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MediaComponent, MediaDetailComponent, MediaUpdateComponent, MediaDeleteDialogComponent, MediaDeletePopupComponent],
    entryComponents: [MediaComponent, MediaUpdateComponent, MediaDeleteDialogComponent, MediaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMediaModule {}
