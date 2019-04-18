import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRating } from 'app/shared/model/factcheck/rating.model';
import { RatingService } from './rating.service';
import { MediaService } from '../../core/media/media.service';
import { ADMIN_ROLE } from 'app/shared/constants/role.constants';
import { DegaUserService } from 'app/entities/core/dega-user';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { JhiAlertService } from 'ng-jhipster';
import { Principal, Account } from 'app/core';
import { Subscription } from 'rxjs';

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
    subscription: Subscription;

    constructor(
        private jhiAlertService: JhiAlertService,
        private ratingService: RatingService,
        private activatedRoute: ActivatedRoute,
        private degaUserService: DegaUserService,
        private mediaService: MediaService,
        private principal: Principal,
        private router: Router
    ) {
        this.subscription = this.mediaService.getProductID().subscribe(message => {
            if (message['type_of_data'] === 'feature') {
                this.updateMediaForFeature(message['selected_url']);
            }
        });
    }

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

    updateMediaForFeature(url) {
        this.rating.iconURL = url;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    showClientIdField(degausersRole: String): boolean {
        return ADMIN_ROLE.includes(degausersRole);
    }
}
