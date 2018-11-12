import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IFactCheck } from 'app/shared/model/factcheck/fact-check.model';
import { FactCheckService } from './fact-check.service';
import { IClaim } from 'app/shared/model/factcheck/claim.model';
import { ClaimService } from 'app/entities/factcheck/claim';

@Component({
    selector: 'jhi-fact-check-update',
    templateUrl: './fact-check-update.component.html'
})
export class FactCheckUpdateComponent implements OnInit {
    factCheck: IFactCheck;
    isSaving: boolean;

    claims: IClaim[];
    publishedDate: string;
    publishedDateGMT: string;
    lastUpdatedDate: string;
    lastUpdatedDateGMT: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private factCheckService: FactCheckService,
        private claimService: ClaimService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ factCheck }) => {
            this.factCheck = factCheck;
            this.publishedDate = this.factCheck.publishedDate != null ? this.factCheck.publishedDate.format(DATE_TIME_FORMAT) : null;
            this.publishedDateGMT =
                this.factCheck.publishedDateGMT != null ? this.factCheck.publishedDateGMT.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.factCheck.lastUpdatedDate != null ? this.factCheck.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDateGMT =
                this.factCheck.lastUpdatedDateGMT != null ? this.factCheck.lastUpdatedDateGMT.format(DATE_TIME_FORMAT) : null;
        });
        this.claimService.query().subscribe(
            (res: HttpResponse<IClaim[]>) => {
                this.claims = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.factCheck.publishedDate = this.publishedDate != null ? moment(this.publishedDate, DATE_TIME_FORMAT) : null;
        this.factCheck.publishedDateGMT = this.publishedDateGMT != null ? moment(this.publishedDateGMT, DATE_TIME_FORMAT) : null;
        this.factCheck.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        this.factCheck.lastUpdatedDateGMT = this.lastUpdatedDateGMT != null ? moment(this.lastUpdatedDateGMT, DATE_TIME_FORMAT) : null;
        if (this.factCheck.id !== undefined) {
            this.subscribeToSaveResponse(this.factCheckService.update(this.factCheck));
        } else {
            this.subscribeToSaveResponse(this.factCheckService.create(this.factCheck));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFactCheck>>) {
        result.subscribe((res: HttpResponse<IFactCheck>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackClaimById(index: number, item: IClaim) {
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
}
