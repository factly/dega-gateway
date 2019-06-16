import { Component, OnDestroy, OnInit } from '@angular/core';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { IClaim } from 'app/shared/model/factcheck/claim.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ClaimSearchService } from './claim-search.service';

@Component({
    selector: 'jhi-claim',
    templateUrl: './claim-search.component.html'
})
export class ClaimSearchComponent implements OnInit {
    constructor(private claimSearchService: ClaimSearchService, private jhiAlertService: JhiAlertService) {}

    // loadAll() {
    //     this.claimSearchService
    //         .query({
    //             page: this.page - 1,
    //             size: this.itemsPerPage
    //         })
    //         .subscribe(
    //             (res: HttpResponse<IClaim[]>) => this.paginateClaims(res.body, res.headers),
    //             (res: HttpErrorResponse) => this.onError(res.message)
    //         );
    // }

    ngOnInit() {
        // this.loadAll();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
