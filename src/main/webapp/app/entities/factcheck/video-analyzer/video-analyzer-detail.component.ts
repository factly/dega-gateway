import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRating } from 'app/shared/model/factcheck/rating.model';

@Component({
    selector: 'jhi-video-analyzer-detail',
    templateUrl: './video-analyzer-detail.component.html'
})
export class VideoAnalyzerDetailComponent implements OnInit {
    rating: IRating;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rating }) => {
            this.rating = rating;
        });
    }

    previousState() {
        window.history.back();
    }
}