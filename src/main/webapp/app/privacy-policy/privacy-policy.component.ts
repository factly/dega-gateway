import { Component, OnInit } from '@angular/core';

import { Principal, Account } from 'app/core';

@Component({
    selector: 'jhi-home',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['privacy-policy.scss']
})
export class PrivacyPolicyComponent implements OnInit {
    constructor(private principal: Principal) {}

    ngOnInit() {}
}
