import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { IRating } from 'app/shared/model/factcheck/rating.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { VideoAnalyzerService } from './video-analyzer.service';
import { IVideoAnalyzer } from 'app/shared/model/factcheck/video-analyzer.model';

@Component({
    selector: 'jhi-video-analyzer',
    templateUrl: './video-analyzer.component.html'
})
export class VideoAnalyzerComponent implements OnInit, OnDestroy {
    currentAccount: any;
    ratings: IRating[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    displayedColumns = ['iconURL', 'name', 'numericValue', 'isDefault', 'clientId', 'createdDate', 'actions'];

    constructor(
        private videoAnalyzerService: VideoAnalyzerService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    loadAll() {
        this.videoAnalyzerService
            .query({
                page: (this.page || 0) - 1,
                size: this.itemsPerPage
            })
            .subscribe(
                (res: HttpResponse<IVideoAnalyzer[]>) => {
                    console.log(res.body);
                    // this.paginateRatings(res.body, res.headers);
                },
                (res: HttpErrorResponse) => {
                    alert('ero');
                    this.onError(res.message);
                }
            );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() {
        // this.eventManager.destroy(this.eventSubscriber);
    }

    transition() {
        this.router.navigate(['/video-analyzer'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    private paginateRatings(data: IRating[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.ratings = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
