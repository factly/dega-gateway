import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import { PRIVACY_POLICY_ROUTE, PrivacyPolicyComponent } from './';

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild([PRIVACY_POLICY_ROUTE])],
    declarations: [PrivacyPolicyComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPrivacyPolicyModule {}
