import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayPostModule as CorePostModule } from './core/post/post.module';
import { GatewayCategoryModule as CoreCategoryModule } from './core/category/category.module';
import { GatewayFormatModule as CoreFormatModule } from './core/format/format.module';
import { GatewayOrganizationModule as CoreOrganizationModule } from './core/organization/organization.module';
import { GatewayStatusModule as CoreStatusModule } from './core/status/status.module';
import { GatewayTagModule as CoreTagModule } from './core/tag/tag.module';
import { GatewayMediaModule as CoreMediaModule } from './core/media/media.module';
import { GatewayDegaUserModule as CoreDegaUserModule } from './core/dega-user/dega-user.module';
import { GatewayRoleModule as CoreRoleModule } from './core/role/role.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CorePostModule,
        CoreCategoryModule,
        CoreFormatModule,
        CoreOrganizationModule,
        CoreStatusModule,
        CoreTagModule,
        CoreMediaModule,
        CoreDegaUserModule,
        CoreRoleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
