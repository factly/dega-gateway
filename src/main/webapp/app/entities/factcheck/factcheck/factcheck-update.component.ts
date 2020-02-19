import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import * as moment from 'moment';

import { CategoryService } from 'app/entities/core/category';
import { IFactcheck } from 'app/shared/model/factcheck/factcheck.model';
import { FactcheckService } from './factcheck.service';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AUTHOR_ROLE, PUBLISHER_ROLE } from 'app/shared/constants/role.constants';
import { IClaim } from 'app/shared/model/factcheck/claim.model';
import { ClaimService } from 'app/entities/factcheck/claim';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaimantService } from 'app/entities/factcheck/claimant';
import { RatingService } from 'app/entities/factcheck/rating';
import { IClaimant } from 'app/shared/model/factcheck/claimant.model';
import { IRating } from 'app/shared/model/factcheck/rating.model';
import { ITag } from 'app/shared/model/core/tag.model';
import { TagService } from 'app/entities/core/tag';
import { ICategory } from 'app/shared/model/core/category.model';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { QuillEditorFileUploadComponent } from 'app/shared/quill-editor/quill-editor-file-upload.component';

import { DegaUserService } from 'app/entities/core/dega-user';
import { Account, Principal } from 'app/core';

import { MatDialog } from '@angular/material/dialog';
import { NewClaimPopupComponent } from 'app/entities/factcheck/claim/new-claim-popup.component';

@Component({
    selector: 'jhi-factcheck-update',
    templateUrl: './factcheck-update.component.html',
    styleUrls: ['./factcheck-update.component.css']
})
export class FactcheckUpdateComponent implements OnInit {
    factcheck: IFactcheck;
    isSaving: boolean;
    tagListContainer = true;
    categoryListContainer = true;
    claims: IClaim[];
    public dateTimeNow: Date = new Date();
    publishedDate: string;
    lastUpdatedDate: string;
    createdDate: string;
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

    factCheckEditFormGroup: FormGroup;

    all_claim_options = [];
    selected_claim_options = [];

    backend_compatible_author_list = [];
    all_author_options = [];
    selected_author_options = [];

    backend_compatible_tag_list = [];
    all_tag_options = [];
    selected_tag_options = [];

    backend_compatible_category_list = [];
    all_category_options = [];
    selected_category_options = [];

    searchResultPerPage = 10;

    searchClaimKeyword = '';
    searchClaimTotalResult = 0;
    searchClaimCurrentPage = 0;

    searchTagKeyword = '';
    searchTagTotalResult = 0;
    searchTagCurrentPage = 0;

    searchCategoryKeyword = '';
    searchCategoryTotalResult = 0;
    searchCategoryCurrentPage = 0;

    searchDegaUserKeyword = '';
    searchDegaUserTotalResult = 0;
    searchDegaUserCurrentPage = 0;

    tag: ITag;
    tagFormGroup: FormGroup;
    categoryFormGroup: FormGroup;

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
        private route: Router,
        private principal: Principal,
        private dialog: MatDialog,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ factcheck }) => {
            this.factcheck = factcheck;
            this.selected_claim_options = this.factcheck.claims;
            this.selected_tag_options = this.processOptionToDesireCheckboxFormat(this.factcheck.tags, 'name');
            this.selected_category_options = this.processOptionToDesireCheckboxFormat(this.factcheck.categories, 'name');
            this.selected_author_options = this.processOptionToDesireCheckboxFormat(this.factcheck.degaUsers, 'displayName');
            this.publishedDate = this.factcheck.publishedDate != null ? this.factcheck.publishedDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.factcheck.lastUpdatedDate != null ? this.factcheck.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
            this.createdDate = this.factcheck.createdDate != null ? this.factcheck.createdDate.format(DATE_TIME_FORMAT) : null;
        });
        this.createFactCheckEditFormGroup();
        this.getAllDegaUsers();
        this.getAllCategories();
        this.getAllClaims();
        this.getAllTags();
        this.createTagFormGroup();
        this.createCategoryFormGroup();

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

        this.principal.identity().then(account => {
            this.account = account;
        });
    }

    reorderClaims(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.factCheckEditFormGroup.value.claims, event.previousIndex, event.currentIndex);
    }

    createFactCheckEditFormGroup() {
        this.factCheckEditFormGroup = this.fb.group({
            id: [this.factcheck.id || ''],
            title: [this.factcheck.title || '', Validators.required],
            introduction: [this.factcheck.introduction || '', Validators.required],
            summary: [this.factcheck.summary || '', Validators.required],
            excerpt: [this.factcheck.excerpt || '', Validators.required],
            featured: [this.factcheck.featured || false],
            sticky: [this.factcheck.sticky || false],
            updates: [this.factcheck.updates || ''],
            slug: [this.factcheck.slug || 'place-holder-slug', Validators.required], // 'place-holder-slug' is done to make validation work.
            media: [this.factcheck.media || null],
            subTitle: [this.factcheck.subTitle || ''],
            statusName: [this.factcheck.statusName || ''],
            claims: [this.factcheck.claims || [], Validators.required],
            categories: [this.factcheck.categories], // convert into this.fb.array
            tags: [this.factcheck.tags], // convert into this.fb.array
            degaUsers: [this.factcheck.degaUsers || '', Validators.required], // convert into this.fb.array
            publishedDate: [this.factcheck.publishedDate || null], // delete once backend is fixed
            createdDate: [this.factcheck.createdDate || null] // delete once backend is fixed
        });
    }

    getAllClaims() {
        this.searchClaimKeyword = '';
        this.claimService
            .query({
                size: 1000,
                sort: ['createdDate,desc']
            })
            .subscribe(
                (res: HttpResponse<IClaim[]>) => {
                    this.claims = res.body;
                    this.all_claim_options = res.body;
                    this.all_claim_options = this.all_claim_options.filter(ar => !this.selected_claim_options.find(rm => rm.id === ar.id));
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    getAllTags() {
        this.searchTagKeyword = '';
        this.searchTagTotalResult = 0;
        this.searchTagCurrentPage = 0;
        this.searchTagKeyword = '';
        this.tagService.query().subscribe(
            (res: HttpResponse<ITag[]>) => {
                this.tags = res.body;
                this.backend_compatible_tag_list = res.body;
                this.all_tag_options = this.processOptionToDesireCheckboxFormat(this.backend_compatible_tag_list, 'name');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    createTagFormGroup() {
        this.tagFormGroup = this.fb.group({
            name: ['', Validators.required],
            slug: [''],
            description: ['', Validators.required],
            createdDate: [''],
            lastUpdatedDate: ['']
        });
    }

    saveTag() {
        if (this.tagFormGroup.invalid) {
            const invalid = [];
            const controls = this.tagFormGroup.controls;
            for (const name in controls) {
                if (controls[name].invalid) {
                    invalid.push(name);
                }
            }
            alert(invalid + ' is required');
            return;
        }
        this.isSaving = true;
        this.tagFormGroup.value.createdDate =
            this.tagFormGroup.value.createdDate != null ? moment(this.tagFormGroup.value.createdDate, DATE_TIME_FORMAT) : null;
        this.tagFormGroup.value.lastUpdatedDate =
            this.tagFormGroup.value.lastUpdatedDate != null ? moment(this.tagFormGroup.value.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        const result = this.tagService.create(this.tagFormGroup.value);
        result.subscribe(
            (res: HttpResponse<ITag>) => {
                this.tagListContainer = true;
                const newlyAddedTag = this.processOptionToDesireCheckboxFormat([res.body], 'name')[0];
                this.selected_tag_options = [newlyAddedTag, ...this.selected_tag_options];
                this.getAllTags();
                this.isSaving = false;
            },
            (res: HttpErrorResponse) => {
                this.onSaveError();
                this.isSaving = false;
            }
        );
    }

    getAllDegaUsers() {
        this.searchDegaUserKeyword = '';
        this.searchDegaUserTotalResult = 0;
        this.searchDegaUserCurrentPage = 0;
        this.degaUserService.query().subscribe(
            (res: HttpResponse<IDegaUser[]>) => {
                this.degausers = res.body;
                this.backend_compatible_author_list = res.body;
                this.all_author_options = this.processOptionToDesireCheckboxFormat(this.backend_compatible_author_list, 'displayName');
                this.currentUser = this.degausers.filter(u => u.email === this.account.email).shift();
                this.showSave = this.showSaveButton(this.currentUser.roleName);
                this.showPublish = this.showPublishButton(this.currentUser.roleName);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getAllCategories() {
        this.searchCategoryKeyword = '';
        this.searchCategoryTotalResult = 0;
        this.searchCategoryCurrentPage = 0;
        this.categoryService.query().subscribe(
            (res: HttpResponse<ICategory[]>) => {
                this.categories = res.body;
                this.backend_compatible_category_list = res.body;
                this.all_category_options = this.processOptionToDesireCheckboxFormat(this.backend_compatible_category_list, 'name');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    createCategoryFormGroup() {
        this.categoryFormGroup = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            slug: [''],
            parent: [''],
            createdDate: [''],
            lastUpdatedDate: ['']
        });
    }

    saveCategory() {
        if (this.categoryFormGroup.invalid) {
            const invalid = [];
            const controls = this.categoryFormGroup.controls;
            for (const name in controls) {
                if (controls[name].invalid) {
                    invalid.push(name);
                }
            }
            alert(invalid + 'is required');
            return;
        }
        this.isSaving = true;
        this.categoryFormGroup.value.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.categoryFormGroup.value.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        const result = this.categoryService.create(this.categoryFormGroup.value);
        result.subscribe(
            (res: HttpResponse<ICategory>) => {
                this.categoryListContainer = true;
                const newlyAddedCategory = this.processOptionToDesireCheckboxFormat([res.body], 'name')[0];
                this.selected_category_options = [newlyAddedCategory, ...this.selected_category_options];
                this.getAllCategories();
            },
            (res: HttpErrorResponse) => {
                this.onSaveError();
                this.isSaving = false;
            }
        );
        this.isSaving = false;
    }

    openDialogPopUp(claimData = null): void {
        const config = {
            height: '98%',
            width: '100vw',
            maxWidth: '95vw',
            autoFocus: false,
            disableClose: true
        };
        if (claimData) {
            config['data'] = claimData;
        }
        const dialogRef = this.dialog.open(NewClaimPopupComponent, config);

        dialogRef.afterClosed().subscribe(result => {
            // This is repeated code because of async issue on update.
            this.addClaimToFactcheck(result);
            this.claimService
                .query({
                    size: 10,
                    sort: ['createdDate,desc']
                })
                .subscribe(
                    (res: HttpResponse<IClaim[]>) => {
                        this.claims = res.body;
                        this.all_claim_options = res.body;
                        this.all_claim_options = this.all_claim_options.filter(
                            ar => !this.selected_claim_options.find(rm => rm.id === ar.id)
                        );
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
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
        this.route.navigate(['/factcheck']);
    }

    saveOrPublish(statusName) {
        if (this.factCheckEditFormGroup.invalid) {
            const invalid = [];
            const controls = this.factCheckEditFormGroup.controls;
            for (const name in controls) {
                if (controls[name].invalid) {
                    invalid.push(name);
                }
            }
            alert(invalid + ' is required');
            return;
        }
        this.isSaving = true;
        this.factCheckEditFormGroup.value.statusName = statusName;
        if (this.factCheckEditFormGroup.value.id !== '') {
            this.subscribeToSaveResponse(this.factcheckService.update(this.factCheckEditFormGroup.value));
        } else {
            delete this.factCheckEditFormGroup.value.id;
            this.factCheckEditFormGroup.value.slug = '';
            this.subscribeToSaveResponse(this.factcheckService.create(this.factCheckEditFormGroup.value));
        }
    }

    addClaimToFactcheck(claimData) {
        const currentClaims = this.factCheckEditFormGroup.value.claims;
        if (!currentClaims.find(obj => obj['id'] === claimData.id)) {
            currentClaims.push(claimData);
        }
        this.factCheckEditFormGroup.controls['claims'].setValue(currentClaims);
        this.all_claim_options = this.all_claim_options.filter(obj => obj['id'] !== claimData.id);
    }

    removeClaimFromFactCheck(claimData) {
        let currentClaims = this.factCheckEditFormGroup.value.claims;
        currentClaims = currentClaims.filter(obj => obj['id'] !== claimData.id);
        this.factCheckEditFormGroup.controls['claims'].setValue(currentClaims);
        this.all_claim_options.push(claimData);
    }

    updateIntroductionFormData(data) {
        this.factCheckEditFormGroup.controls['introduction'].setValue(data['html']);
    }

    updateSummaryFormData(data) {
        this.factCheckEditFormGroup.controls['summary'].setValue(data['html']);
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

    chooseMediaforFeature() {
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
        this.factCheckEditFormGroup.controls['media'].setValue(imageData);
    }

    deleteMediaForFactcheck() {
        this.factCheckEditFormGroup.controls['media'].setValue(null);
    }

    // Think about optimising this code block, move it to a service, Starts here
    processOptionToDesireCheckboxFormat(option_list, key_name) {
        const formatted_option_list = [];
        for (const option_details of option_list) {
            const option_format = {};
            option_format['id'] = option_details['id'];
            option_format['display_text'] = option_details[key_name];
            formatted_option_list.push(option_format);
        }
        return formatted_option_list;
    }

    processTagToBackendRequiredFormat(tag_list) {
        const formatted_tag_list = [];
        for (const tag_details of tag_list) {
            formatted_tag_list.push(this.backend_compatible_tag_list.filter(obj => obj['id'] === tag_details['id'])[0]);
        }
        return formatted_tag_list;
    }

    processAuthorToBackendRequiredFormat(author_list) {
        const formatted_author_list = [];
        for (const author_details of author_list) {
            formatted_author_list.push(this.backend_compatible_author_list.filter(obj => obj['id'] === author_details['id'])[0]);
        }
        return formatted_author_list;
    }

    processCategoryToBackendRequiredFormat(category_list) {
        const formatted_category_list = [];
        for (const category_details of category_list) {
            formatted_category_list.push(this.backend_compatible_category_list.filter(obj => obj['id'] === category_details['id'])[0]);
        }
        return formatted_category_list;
    }

    // Think about optimising this code block, move it to a service, Ends here
    update_tag_selection(val) {
        this.factCheckEditFormGroup.controls['tags'].setValue(this.processTagToBackendRequiredFormat(val));
    }

    update_category_selection(val) {
        this.factCheckEditFormGroup.controls['categories'].setValue(this.processCategoryToBackendRequiredFormat(val));
    }

    update_author_selection(val) {
        this.factCheckEditFormGroup.controls['degaUsers'].setValue(this.processAuthorToBackendRequiredFormat(val));
    }

    searchClaims() {
        this.claimService
            .search({
                page: this.searchClaimCurrentPage,
                query: this.searchClaimKeyword,
                size: this.searchResultPerPage
            })
            .subscribe(
                (res: HttpResponse<IClaim[]>) => {
                    this.claims = res.body;
                    this.all_claim_options = this.claims;
                    this.all_claim_options = this.all_claim_options.filter(ar => !this.selected_claim_options.find(rm => rm.id === ar.id));
                    this.searchClaimTotalResult = parseInt(res.headers.get('X-Total-Count'), 10);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    searchTags() {
        this.tagService
            .search({
                page: this.searchTagCurrentPage,
                query: this.searchTagKeyword,
                size: this.searchResultPerPage
            })
            .subscribe(
                (res: HttpResponse<ITag[]>) => {
                    this.tags = res.body;
                    this.backend_compatible_tag_list = res.body;
                    this.all_tag_options = this.processOptionToDesireCheckboxFormat(this.tags, 'name');
                    this.searchTagTotalResult = parseInt(res.headers.get('X-Total-Count'), 10);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    searchCategories() {
        this.categoryService
            .search({
                page: this.searchCategoryCurrentPage,
                query: this.searchCategoryKeyword,
                size: this.searchResultPerPage
            })
            .subscribe(
                (res: HttpResponse<ICategory[]>) => {
                    this.categories = res.body;
                    this.backend_compatible_category_list = res.body;
                    this.all_category_options = this.processOptionToDesireCheckboxFormat(this.categories, 'name');
                    this.searchCategoryTotalResult = parseInt(res.headers.get('X-Total-Count'), 10);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    searchDegaUsers() {
        this.degaUserService
            .search({
                page: this.searchDegaUserCurrentPage,
                query: this.searchDegaUserKeyword,
                size: this.searchResultPerPage
            })
            .subscribe(
                (res: HttpResponse<IDegaUser[]>) => {
                    this.degausers = res.body;
                    this.backend_compatible_author_list = res.body;
                    this.all_author_options = this.processOptionToDesireCheckboxFormat(this.backend_compatible_author_list, 'displayName');
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
}
