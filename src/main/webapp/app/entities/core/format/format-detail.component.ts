import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormat } from 'app/shared/model/core/format.model';

@Component({
    selector: 'jhi-format-detail',
    templateUrl: './format-detail.component.html'
})
export class FormatDetailComponent implements OnInit {
    format: IFormat;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ format }) => {
            this.format = format;
        });
    }

    previousState() {
        window.history.back();
    }
}
