import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { Claim, IClaim } from 'app/shared/model/factcheck/claim.model';
import { IClaimant } from 'app/shared/model/factcheck/claimant.model';
import { ClaimService } from 'app/entities/factcheck/claim/claim.service';
import { ClaimantService } from 'app/entities/factcheck/claimant';
import { IFactcheck } from 'app/shared/model/factcheck/factcheck.model';
import { FactcheckService } from 'app/entities/factcheck/factcheck';
import { IRating } from 'app/shared/model/factcheck/rating.model';
import { RatingService } from 'app/entities/factcheck/rating';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    claimFormGroup: FormGroup;

    constructor(
        private jhiAlertService: JhiAlertService,
        private claimService: ClaimService,
        private ratingService: RatingService,
        private claimantService: ClaimantService,
        private factcheckService: FactcheckService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<NewClaimPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.isSaving = false;
        // If new claim then null data would be sent
        this.claim = this.data === null ? new Claim() : this.data;
        this.createdDate = this.claim.createdDate != null ? this.claim.createdDate.format(DATE_TIME_FORMAT) : null;
        this.lastUpdatedDate = this.claim.lastUpdatedDate != null ? this.claim.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
        this.createClaimEditFormGroup();
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

    createClaimEditFormGroup() {
        const claim_date = this.claim.claimDate !== null ? this.claim.claimDate.toISOString() : '';
        const checked_date = this.claim.checkedDate !== null ? this.claim.checkedDate.toISOString() : '';
        this.claimFormGroup = this.fb.group({
            id: [this.claim.id || ''],
            claim: [this.claim.claim || '', Validators.required],
            description: [this.claim.description || '', Validators.required],
            claimDate: [claim_date, Validators.required],
            claimSource: [this.claim.claimSource || '', Validators.required],
            checkedDate: [checked_date, Validators.required],
            reviewSources: [this.claim.reviewSources || '', Validators.required],
            review: [this.claim.review || '', Validators.required],
            reviewTagLine: [this.claim.reviewTagLine || '', Validators.required],
            clientId: [this.claim.clientId || '', Validators.required],
            slug: [this.claim.slug || '', Validators.required],
            createdDate: [this.claim.createdDate || '', Validators.required],
            ratingId: [this.claim.ratingId || '', Validators.required],
            claimantId: [this.claim.claimantId || '', Validators.required]
        });
    }

    previousState(savedClaim) {
        this.dialogRef.close(savedClaim);
    }

    save() {
        if (this.claimFormGroup.invalid) {
            const invalid = [];
            const controls = this.claimFormGroup.controls;
            for (const name in controls) {
                if (controls[name].invalid) {
                    invalid.push(name);
                }
            }
            alert(invalid + ' is required');
            return;
        }
        this.isSaving = true;
        console.log(this.claimFormGroup.value.checkedDate);
        this.claimFormGroup.value.checkedDate =
            this.claimFormGroup.value.checkedDate != null ? moment(this.claimFormGroup.value.checkedDate, DATE_TIME_FORMAT) : null;
        this.claimFormGroup.value.claimDate =
            this.claimFormGroup.value.claimDate != null ? moment(this.claimFormGroup.value.claimDate, DATE_TIME_FORMAT) : null;
        this.claimFormGroup.value.createdDate =
            this.claimFormGroup.value.createdDate != null ? moment(this.claimFormGroup.value.createdDate, DATE_TIME_FORMAT) : null;
        this.claimFormGroup.value.lastUpdatedDate =
            this.claimFormGroup.value.lastUpdatedDate != null ? moment(this.claimFormGroup.value.lastUpdatedDate, DATE_TIME_FORMAT) : null;

        if (this.claimFormGroup.value.id !== '') {
            console.log(this.claimFormGroup.value);
            this.subscribeToSaveResponse(this.claimService.update(this.claimFormGroup.value));
        } else {
            console.log(this.claimFormGroup.value);
            this.subscribeToSaveResponse(this.claimService.create(this.claimFormGroup.value));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClaim>>) {
        result.subscribe((res: HttpResponse<IClaim>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(savedClaim: IClaim) {
        this.isSaving = false;
        this.previousState(savedClaim);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    updateIntroductionFormData(data) {
        this.claimFormGroup.controls['description'].setValue(data['html']);
    }

    updateReviewFormData(data) {
        this.claimFormGroup.controls['review'].setValue(data['html']);
    }
}
