import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    FactCheckComponent,
    FactCheckDetailComponent,
    FactCheckUpdateComponent,
    FactCheckDeletePopupComponent,
    FactCheckDeleteDialogComponent,
    factCheckRoute,
    factCheckPopupRoute
} from './';

const ENTITY_STATES = [...factCheckRoute, ...factCheckPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FactCheckComponent,
        FactCheckDetailComponent,
        FactCheckUpdateComponent,
        FactCheckDeleteDialogComponent,
        FactCheckDeletePopupComponent
    ],
    entryComponents: [FactCheckComponent, FactCheckUpdateComponent, FactCheckDeleteDialogComponent, FactCheckDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFactCheckModule {}
