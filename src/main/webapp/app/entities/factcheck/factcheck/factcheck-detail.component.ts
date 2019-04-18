import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFactcheck } from 'app/shared/model/factcheck/factcheck.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'jhi-factcheck-detail',
    templateUrl: './factcheck-detail.component.html'
})
export class FactcheckDetailComponent implements OnInit {
    factcheck: IFactcheck;

    constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ factcheck }) => {
            factcheck.introduction = this.sanitizer.bypassSecurityTrustHtml(factcheck.introduction);
            factcheck.summary = this.sanitizer.bypassSecurityTrustHtml(factcheck.summary);
            this.factcheck = factcheck;
        });
    }

    previousState() {
        window.history.back();
    }
}
