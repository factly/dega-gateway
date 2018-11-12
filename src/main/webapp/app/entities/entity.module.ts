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
import { GatewayFactCheckModule as FactcheckFactCheckModule } from './factcheck/fact-check/fact-check.module';
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
        FactcheckRatingModule,
        FactcheckClaimModule,
        FactcheckClaimantModule,
        FactcheckFactCheckModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
