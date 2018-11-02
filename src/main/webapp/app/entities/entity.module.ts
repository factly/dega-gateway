import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayOrganizationModule as CoreOrganizationModule } from './core/organization/organization.module';
import { GatewayPostModule as CorePostModule } from './core/post/post.module';
import { GatewayCategoryModule as CoreCategoryModule } from './core/category/category.module';
import { GatewayTagModule as CoreTagModule } from './core/tag/tag.module';
import { GatewayFormatModule as CoreFormatModule } from './core/format/format.module';
import { GatewayStatusModule as CoreStatusModule } from './core/status/status.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CoreOrganizationModule,
        CorePostModule,
        CoreCategoryModule,
        CoreTagModule,
        CoreFormatModule,
        CoreStatusModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
