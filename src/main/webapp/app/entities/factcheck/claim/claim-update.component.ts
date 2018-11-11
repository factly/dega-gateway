import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IClaim } from 'app/shared/model/factcheck/claim.model';
import { ClaimService } from './claim.service';
import { IClaimant } from 'app/shared/model/factcheck/claimant.model';
import { ClaimantService } from 'app/entities/factcheck/claimant';
import { IRating } from 'app/shared/model/factcheck/rating.model';
import { RatingService } from 'app/entities/factcheck/rating';

@Component({
    selector: 'jhi-claim-update',
    templateUrl: './claim-update.component.html'
})
export class ClaimUpdateComponent implements OnInit {
    claim: IClaim;
    isSaving: boolean;

    claimants: IClaimant[];

    ratings: IRating[];
    claimDateDp: any;
    checkedDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private claimService: ClaimService,
        private claimantService: ClaimantService,
        private ratingService: RatingService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ claim }) => {
            this.claim = claim;
        });
        this.claimantService.query().subscribe(
            (res: HttpResponse<IClaimant[]>) => {
                this.claimants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ratingService.query().subscribe(
            (res: HttpResponse<IRating[]>) => {
                this.ratings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.claim.id !== undefined) {
            this.subscribeToSaveResponse(this.claimService.update(this.claim));
        } else {
            this.subscribeToSaveResponse(this.claimService.create(this.claim));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClaim>>) {
        result.subscribe((res: HttpResponse<IClaim>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackClaimantById(index: number, item: IClaimant) {
        return item.id;
    }

    trackRatingById(index: number, item: IRating) {
        return item.id;
    }
}
