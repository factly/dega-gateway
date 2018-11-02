import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
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
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [FormatComponent, FormatDetailComponent, FormatUpdateComponent, FormatDeleteDialogComponent, FormatDeletePopupComponent],
    entryComponents: [FormatComponent, FormatUpdateComponent, FormatDeleteDialogComponent, FormatDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFormatModule {}
