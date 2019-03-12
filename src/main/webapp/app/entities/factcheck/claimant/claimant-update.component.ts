import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IClaimant } from 'app/shared/model/factcheck/claimant.model';
import { ClaimantService } from './claimant.service';
import { MediaService } from '../../core/media/media.service';

@Component({
    selector: 'jhi-claimant-update',
    templateUrl: './claimant-update.component.html'
})
export class ClaimantUpdateComponent implements OnInit {
    claimant: IClaimant;
    isSaving: boolean;
    createdDate: string;
    lastUpdatedDate: string;
    slug: string;
    slugExtention: number;
    tempSlug: string;

    constructor(private claimantService: ClaimantService, private activatedRoute: ActivatedRoute, private mediaService: MediaService) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ claimant }) => {
            this.claimant = claimant;
            this.createdDate = this.claimant.createdDate != null ? this.claimant.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.claimant.lastUpdatedDate != null ? this.claimant.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
        });
        if (this.claimant.id === undefined || this.claimant.imageURL === undefined) {
            this.mediaService.setImageSrcUrl(null);
        } else {
            this.mediaService.setImageSrcUrl(this.claimant.imageURL);
        }
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.claimant.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.claimant.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        if (this.claimant.id !== undefined) {
            this.subscribeToSaveResponse(this.claimantService.update(this.claimant));
        } else {
            this.subscribeToSaveResponse(this.claimantService.create(this.claimant));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClaimant>>) {
        result.subscribe((res: HttpResponse<IClaimant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    bindSlug(event: any) {
        if (this.claimant.id === undefined) {
            this.slugExtention = 0;
            this.slug = event.target.value
                .replace(/[;/?:@=&"<>#%{}|\^~]/g, '')
                .replace(/\s+/g, '-')
                .toLowerCase();
            this.tempSlug = this.slug;
            this.createSlug();
        }
    }

    createSlug() {
        if (this.slug) {
            this.claimantService.getClaimantBySlug(this.slug).subscribe((res: HttpResponse<IClaimant>) => {
                if (res.body) {
                    this.slugExtention += 1;
                    this.slug = this.tempSlug + this.slugExtention;
                    this.createSlug();
                }
                this.claimant.slug = this.slug;
            });
        }
    }
    getImageSrcUrl() {
        this.claimant.imageURL = this.mediaService.getImageSrcUrl();
    }
}
