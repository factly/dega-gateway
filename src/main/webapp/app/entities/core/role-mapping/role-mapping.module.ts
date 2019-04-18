import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    RoleMappingComponent,
    RoleMappingDetailComponent,
    RoleMappingUpdateComponent,
    RoleMappingDeletePopupComponent,
    RoleMappingDeleteDialogComponent,
    roleMappingRoute,
    roleMappingPopupRoute
} from './';

const ENTITY_STATES = [...roleMappingRoute, ...roleMappingPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RoleMappingComponent,
        RoleMappingDetailComponent,
        RoleMappingUpdateComponent,
        RoleMappingDeleteDialogComponent,
        RoleMappingDeletePopupComponent
    ],
    entryComponents: [RoleMappingComponent, RoleMappingUpdateComponent, RoleMappingDeleteDialogComponent, RoleMappingDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayRoleMappingModule {}
