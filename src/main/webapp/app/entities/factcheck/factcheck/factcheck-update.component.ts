import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AUTHOR_ROLE, PUBLISHER_ROLE } from 'app/shared/constants/role.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IFactcheck } from 'app/shared/model/factcheck/factcheck.model';
import { FactcheckService } from './factcheck.service';
import { IClaim } from 'app/shared/model/factcheck/claim.model';
import { ClaimService } from 'app/entities/factcheck/claim';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaimantService } from 'app/entities/factcheck/claimant';
import { RatingService } from 'app/entities/factcheck/rating';
import { IClaimant } from 'app/shared/model/factcheck/claimant.model';
import { IRating } from 'app/shared/model/factcheck/rating.model';
import { ITag } from 'app/shared/model/core/tag.model';
import { TagService } from 'app/entities/core/tag';
import { ICategory } from 'app/shared/model/core/category.model';
import { CategoryService } from 'app/entities/core/category';
import { MediaService } from '../../core/media/media.service';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { DegaUserService } from 'app/entities/core/dega-user';
import { Account, Principal } from 'app/core';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material';
import { NewClaimPopupComponent } from '../claim/new-claim-popup.component';

@Component({
    selector: 'jhi-factcheck-update',
    templateUrl: './factcheck-update.component.html'
})
export class FactcheckUpdateComponent implements OnInit {
    factcheck: IFactcheck;
    isSaving: boolean;

    claims: IClaim[];
    publishedDate: string;
    lastUpdatedDate: string;
    createdDate: string;
    slug: string;
    slugExtention: number;
    tempSlug: string;
    formGroup: FormGroup;
    claimants: IClaimant[];
    ratings: IRating[];
    tags: ITag[];
    categories: ICategory[];
    degausers: IDegaUser[];
    currentUser: IDegaUser;
    showSave: boolean;
    showPublish: boolean;
    account: Account;
    subscription: Subscription;

    constructor(
        private jhiAlertService: JhiAlertService,
        private factcheckService: FactcheckService,
        private claimService: ClaimService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private claimantService: ClaimantService,
        private ratingService: RatingService,
        private tagService: TagService,
        private categoryService: CategoryService,
        private degaUserService: DegaUserService,
        private mediaService: MediaService,
        private principal: Principal,
        private dialog: MatDialog
    ) {
        this.subscription = this.mediaService.getProductID().subscribe(message => {
            if (message['type_of_data'] === 'feature') {
                this.updateMediaForFeature(message['selected_url']);
            }
        });
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ factcheck }) => {
            this.factcheck = factcheck;
            this.publishedDate = this.factcheck.publishedDate != null ? this.factcheck.publishedDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.factcheck.lastUpdatedDate != null ? this.factcheck.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
            this.createdDate = this.factcheck.createdDate != null ? this.factcheck.createdDate.format(DATE_TIME_FORMAT) : null;
        });
        this.claimService
            .query({
                size: 1000,
                sort: ['createdDate,desc']
            })
            .subscribe(
                (res: HttpResponse<IClaim[]>) => {
                    this.claims = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.formGroup = this.formBuilder.group({
            claims: this.formBuilder.array([])
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

        this.tagService.query().subscribe(
            (res: HttpResponse<ITag[]>) => {
                this.tags = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.categoryService.query().subscribe(
            (res: HttpResponse<ICategory[]>) => {
                this.categories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.degaUserService.query().subscribe(
            (res: HttpResponse<IDegaUser[]>) => {
                this.degausers = res.body;
                this.currentUser = this.degausers.filter(u => u.email === this.account.email).shift();
                this.showSave = this.showSaveButton(this.currentUser.roleName);
                this.showPublish = this.showPublishButton(this.currentUser.roleName);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    openDialogPopUp(): void {
        const config = {
            height: '98%',
            width: '100vw',
            maxWidth: '95vw',
            autoFocus: false,
            disableClose: true
        };
        const dialogRef = this.dialog.open(NewClaimPopupComponent, config);

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    addClaimGroup(): FormGroup {
        return this.formBuilder.group({
            claim: ['', Validators.required],
            description: [],
            claimDate: [],
            claimSource: [],
            checkedDate: [],
            reviewSources: [],
            review: [],
            reviewTagLine: [],
            ratingId: [],
            claimantId: [],
            slug: []
        });
    }

    previousState() {
        window.history.back();
    }

    saveOrPublish(statusName) {
        this.isSaving = true;
        if (this.formGroup) {
            for (const key in this.formGroup.value.claims) {
                if (key) {
                    if (this.factcheck.claims && this.factcheck.claims.length > 0) {
                        this.factcheck.claims.push(this.formGroup.value.claims[key]);
                    } else {
                        this.factcheck.claims = this.formGroup.value.claims[key];
                    }
                }
            }
        }
        if (this.factcheck.id !== undefined) {
            this.factcheck.statusName = statusName;
            this.subscribeToSaveResponse(this.factcheckService.update(this.factcheck));
        } else {
            this.subscribeToSaveResponse(this.factcheckService.create(this.factcheck));
        }
    }

    updateIntroductionFormData(data) {
        this.factcheck.introduction = data['html'];
    }

    updateSummaryFormData(data) {
        this.factcheck.summary = data['html'];
    }

    showSaveButton(degausersRole: String): boolean {
        return AUTHOR_ROLE.includes(degausersRole);
    }

    showPublishButton(degausersRole: String): boolean {
        return PUBLISHER_ROLE.includes(degausersRole);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFactcheck>>) {
        result.subscribe((res: HttpResponse<IFactcheck>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRatingById(index: number, item: IRating) {
        return item.id;
    }

    trackClaimantById(index: number, item: IClaimant) {
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

    get claimsArray() {
        return <FormArray>this.formGroup.get('claims');
    }

    addClaim() {
        this.claimsArray.push(this.addClaimGroup());
    }

    removeClaim(index) {
        this.claimsArray.removeAt(index);
    }

    submitHandler() {
        this.claims = this.formGroup.value;
    }

    trackTagById(index: number, item: ITag) {
        return item.id;
    }

    trackCategoryById(index: number, item: ICategory) {
        return item.id;
    }

    trackDegaUserById(index: number, item: IDegaUser) {
        return item.id;
    }

    updateMediaForFeature(url) {
        this.factcheck.featuredMedia = url;
    }
}
