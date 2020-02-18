import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { OrganizationComponent, OrganizationDetailComponent, OrganizationUpdateComponent, organizationRoute } from './';

const ENTITY_STATES = [...organizationRoute];

@NgModule({
    imports: [
        GatewaySharedModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [OrganizationComponent, OrganizationDetailComponent, OrganizationUpdateComponent],
    entryComponents: [OrganizationComponent, OrganizationUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayOrganizationModule {}
