import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRating } from 'app/shared/model/factcheck/rating.model';
import { RatingService } from './rating.service';
import { ADMIN_ROLE } from 'app/shared/constants/role.constants';
import { DegaUserService } from 'app/entities/core/dega-user';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { JhiAlertService } from 'ng-jhipster';
import { Account, Principal } from 'app/core';

import { QuillEditorFileUploadComponent } from 'app/shared/quill-editor/quill-editor-file-upload.component';

@Component({
    selector: 'jhi-rating-update',
    templateUrl: './rating-update.component.html'
})
export class RatingUpdateComponent implements OnInit {
    rating: IRating;
    degausers: IDegaUser[];
    isSaving: boolean;
    createdDate: string;
    lastUpdatedDate: string;
    slug: string;
    slugExtention: number;
    tempSlug: string;
    showClientId: boolean;
    currentUser: IDegaUser;
    account: Account;

    constructor(
        private jhiAlertService: JhiAlertService,
        private ratingService: RatingService,
        private activatedRoute: ActivatedRoute,
        private degaUserService: DegaUserService,
        private principal: Principal,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rating }) => {
            this.rating = rating;
            this.createdDate = this.rating.createdDate != null ? this.rating.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.rating.lastUpdatedDate != null ? this.rating.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.degaUserService.query().subscribe(
            (res: HttpResponse<IDegaUser[]>) => {
                this.degausers = res.body;
                this.currentUser = this.degausers.filter(u => u.email === this.account.email).shift();
                this.showClientId = this.showClientIdField(this.currentUser.roleName);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.rating.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.rating.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        if (this.rating.id !== undefined) {
            this.subscribeToSaveResponse(this.ratingService.update(this.rating));
        } else {
            this.subscribeToSaveResponse(this.ratingService.create(this.rating));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRating>>) {
        result.subscribe((res: HttpResponse<IRating>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    choseMediaforFeature() {
        const config = {
            height: '90%',
            width: '90vw',
            maxWidth: '90vw'
        };
        const dialogRef = this.dialog.open(QuillEditorFileUploadComponent, config);

        dialogRef.afterClosed().subscribe(imageData => {
            if (imageData) {
                this.updateMediaForFeature(imageData);
            }
        });
    }

    updateMediaForFeature(imageData) {
        this.rating.media = imageData;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    showClientIdField(degausersRole: String): boolean {
        return ADMIN_ROLE.includes(degausersRole);
    }

    deleteMediaForRating() {
        this.rating.media = null;
    }
}
