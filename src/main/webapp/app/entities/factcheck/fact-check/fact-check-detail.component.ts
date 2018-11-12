import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFactCheck } from 'app/shared/model/factcheck/fact-check.model';

@Component({
    selector: 'jhi-fact-check-detail',
    templateUrl: './fact-check-detail.component.html'
})
export class FactCheckDetailComponent implements OnInit {
    factCheck: IFactCheck;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ factCheck }) => {
            this.factCheck = factCheck;
        });
    }

    previousState() {
        window.history.back();
    }
}
