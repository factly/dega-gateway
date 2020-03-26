import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import { MediaComponent, MediaDetailComponent, MediaUpdateComponent, mediaRoute } from './';
import { MatButtonModule, MatChipsModule, MatIconModule, MatInputModule, MatTooltipModule } from '@angular/material';

const ENTITY_STATES = [...mediaRoute];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule
    ],
    declarations: [MediaComponent, MediaDetailComponent, MediaUpdateComponent],
    entryComponents: [MediaComponent, MediaUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMediaModule {}
