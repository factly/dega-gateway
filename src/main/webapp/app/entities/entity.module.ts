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
import { GatewayRatingModule as FactcheckRatingModule } from './factcheck/rating/rating.module';
import { GatewayClaimModule as FactcheckClaimModule } from './factcheck/claim/claim.module';
import { GatewayClaimantModule as FactcheckClaimantModule } from './factcheck/claimant/claimant.module';
import { GatewayFactcheckModule as FactcheckFactcheckModule } from './factcheck/factcheck/factcheck.module';
import { GatewayRoleMappingModule as CoreRoleMappingModule } from './core/role-mapping/role-mapping.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

import { GatewaySharedModule } from 'app/shared/shared.module';

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
        FactcheckRatingModule,
        FactcheckClaimModule,
        FactcheckClaimantModule,
        FactcheckFactcheckModule,
        CoreRoleMappingModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */

        GatewaySharedModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
