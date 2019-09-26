import { Route } from '@angular/router';

import { PrivacyPolicyComponent } from './privacy-policy.component';

export const PRIVACY_POLICY_ROUTE: Route = {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
