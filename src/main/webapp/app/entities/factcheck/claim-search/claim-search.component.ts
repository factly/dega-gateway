import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

import { IClaimSearch, IClaimSearchClaimDetails } from 'app/shared/model/factcheck/claim-search.model';
import { ClaimSearchService } from './claim-search.service';

@Component({
    selector: 'jhi-claim',
    templateUrl: './claim-search.component.html'
})
export class ClaimSearchComponent implements OnInit {
    claimsSearchResult: IClaimSearchClaimDetails[];

    constructor(private claimSearchService: ClaimSearchService, private jhiAlertService: JhiAlertService) {}

    ngOnInit() {}

    search(keyword) {
        this.claimSearchService
            .query({
                query: keyword
            })
            .subscribe(
                (res: HttpResponse<IClaimSearch>) => {
                    this.claimsSearchResult = res.body.claims;
                    if (!this.claimsSearchResult) {
                        alert('No data found');
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
