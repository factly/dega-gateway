import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClaim } from 'app/shared/model/factcheck/claim.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'jhi-claim-detail',
    templateUrl: './claim-detail.component.html'
})
export class ClaimDetailComponent implements OnInit {
    claim: IClaim;

    constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ claim }) => {
            claim.description = this.sanitizer.bypassSecurityTrustHtml(claim.description);
            this.claim = claim;
        });
    }

    previousState() {
        window.history.back();
    }
}
