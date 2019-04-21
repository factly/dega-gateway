import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { Claim } from 'app/shared/model/factcheck/claim.model';
import { IClaim } from 'app/shared/model/factcheck/claim.model';
import { IClaimant } from 'app/shared/model/factcheck/claimant.model';
import { ClaimService } from 'app/entities/factcheck/claim/claim.service';
import { ClaimantService } from 'app/entities/factcheck/claimant';
import { IFactcheck } from 'app/shared/model/factcheck/factcheck.model';
import { FactcheckService } from 'app/entities/factcheck/factcheck';
import { IRating } from 'app/shared/model/factcheck/rating.model';
import { RatingService } from 'app/entities/factcheck/rating';

@Component({
    selector: 'jhi-new-claim-popup',
    templateUrl: './new-claim-popup.component.html'
})
export class NewClaimPopupComponent implements OnInit {
    claim: IClaim;
    isSaving: boolean;

    ratings: IRating[];

    claimants: IClaimant[];

    factchecks: IFactcheck[];
    createdDate: string;
    lastUpdatedDate: string;
    slug: string;
    slugExtention: number;
    tempSlug: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private claimService: ClaimService,
        private ratingService: RatingService,
        private claimantService: ClaimantService,
        private factcheckService: FactcheckService,
        public dialogRef: MatDialogRef<NewClaimPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.isSaving = false;
        // If new claim then null data would be sent
        this.claim = this.data === null ? new Claim() : this.data;
        this.createdDate = this.claim.createdDate != null ? this.claim.createdDate.format(DATE_TIME_FORMAT) : null;
        this.lastUpdatedDate = this.claim.lastUpdatedDate != null ? this.claim.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
        this.ratingService.query().subscribe(
            (res: HttpResponse<IRating[]>) => {
                this.ratings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.claimantService.query().subscribe(
            (res: HttpResponse<IClaimant[]>) => {
                this.claimants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.factcheckService.query().subscribe(
            (res: HttpResponse<IFactcheck[]>) => {
                this.factchecks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        this.dialogRef.close();
    }

    save() {
        this.isSaving = true;
        this.claim.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.claim.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
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

    trackRatingById(index: number, item: IRating) {
        return item.id;
    }

    trackClaimantById(index: number, item: IClaimant) {
        return item.id;
    }

    trackFactcheckById(index: number, item: IFactcheck) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    updateIntroductionFormData(data) {
        this.claim.description = data['html'];
    }
}
