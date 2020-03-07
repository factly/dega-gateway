import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { IFactcheck } from 'app/shared/model/factcheck/factcheck.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { FactcheckService } from './factcheck.service';
import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'jhi-factcheck',
    templateUrl: './factcheck.component.html'
})
export class FactcheckComponent implements OnInit, OnDestroy {
    currentAccount: any;
    factchecks: IFactcheck[];
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

    constructor(
        private factcheckService: FactcheckService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private dialog: MatDialog
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    openDialogPopUp(factcheckDetails): void {
        const title = factcheckDetails.title;
        const config = {
            data: {
                message: `You are going to delete factcheck with the title "${title}" ?`
            }
        };
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, config);

        dialogRef.afterClosed().subscribe(selectedOption => {
            if (selectedOption.accept) {
                this.factcheckService.delete(factcheckDetails.id).subscribe(response => {
                    this.loadAll();
                });
            }
        });
    }

    openCopyDialogPopUp(factcheckDetails): void {
        const factcheck_title = factcheckDetails.title;
        const config = {
            panelClass: ['header-dialogue'],
            data: {
                message: `You are going to copy the factcheck with the title "${factcheck_title}" ?`
            }
        };
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, config);

        dialogRef.afterClosed().subscribe(selectedOption => {
            if (selectedOption.accept) {
                delete factcheckDetails['id'];
                factcheckDetails['title'] = 'copy of ' + factcheckDetails['title'];
                this.factcheckService.create(factcheckDetails).subscribe(response => {
                    this.loadAll();
                });
            }
        });
    }

    loadAll() {
        if (this.currentSearch) {
            this.factcheckService
                .search({
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<IFactcheck[]>) => this.paginateFactchecks(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.factcheckService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IFactcheck[]>) => this.paginateFactchecks(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/factcheck'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([
            '/factcheck',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            '/factcheck',
            {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFactchecks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFactcheck) {
        return item.id;
    }

    registerChangeInFactchecks() {
        this.eventSubscriber = this.eventManager.subscribe('factcheckListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'createdDate') {
            result.push('createdDate');
        }
        return result;
    }

    private paginateFactchecks(data: IFactcheck[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.factchecks = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
