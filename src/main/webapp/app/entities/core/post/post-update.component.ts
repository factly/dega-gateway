import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AUTHOR_ROLE, PUBLISHER_ROLE } from 'app/shared/constants/role.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IPost } from 'app/shared/model/core/post.model';
import { PostService } from './post.service';
import { ITag } from 'app/shared/model/core/tag.model';
import { TagService } from 'app/entities/core/tag';
import { ICategory } from 'app/shared/model/core/category.model';
import { CategoryService } from 'app/entities/core/category';
import { IStatus } from 'app/shared/model/core/status.model';
import { StatusService } from 'app/entities/core/status';
import { IFormat } from 'app/shared/model/core/format.model';
import { FormatService } from 'app/entities/core/format';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { DegaUserService } from 'app/entities/core/dega-user';
import { Account, Principal } from 'app/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuillEditorFileUploadComponent } from 'app/shared/quill-editor/quill-editor-file-upload.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'jhi-post-update',
    templateUrl: './post-update.component.html',
    styleUrls: ['post.scss']
})
export class PostUpdateComponent implements OnInit {
    post: IPost;
    isSaving: boolean;

    tags: ITag[];

    categories: ICategory[];

    statuses: IStatus[];

    formats: IFormat[];

    degausers: IDegaUser[];
    currentUser: IDegaUser;
    publishedDate: string;
    lastUpdatedDate: string;
    createdDate: string;
    showSave: boolean;
    showPublish: boolean;
    account: Account;
    postEditFormGroup: FormGroup;
    tagListContainer = true;
    categoryListContainer = true;

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

    searchTagKeyword = '';
    searchTagTotalResult = 0;
    searchTagCurrentPage = 0;

    searchCategoryKeyword = '';
    searchCategoryTotalResult = 0;
    searchCategoryCurrentPage = 0;

    searchDegaUserKeyword = '';
    searchDegaUserTotalResult = 0;
    searchDegaUserCurrentPage = 0;

    tagFormGroup: FormGroup;
    categoryFormGroup: FormGroup;

    constructor(
        private jhiAlertService: JhiAlertService,
        private postService: PostService,
        private tagService: TagService,
        private categoryService: CategoryService,
        private statusService: StatusService,
        private formatService: FormatService,
        private degaUserService: DegaUserService,
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private principal: Principal,
        private fb: FormBuilder,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ post }) => {
            this.post = post;
            this.selected_tag_options = this.processOptionToDesireCheckboxFormat(this.post.tags, 'name');
            this.selected_category_options = this.processOptionToDesireCheckboxFormat(this.post.categories, 'name');
            this.selected_author_options = this.processOptionToDesireCheckboxFormat(this.post.degaUsers, 'displayName');
            this.publishedDate = this.post.publishedDate != null ? this.post.publishedDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.post.lastUpdatedDate != null ? this.post.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
            this.createdDate = this.post.createdDate != null ? this.post.createdDate.format(DATE_TIME_FORMAT) : null;
        });
        this.createPostEditFormGroup();
        this.getAllDegaUsers();
        this.getAllCategories();
        this.getAllTags();
        this.createTagFormGroup();
        this.createCategoryFormGroup();
        this.statusService.query().subscribe(
            (res: HttpResponse<IStatus[]>) => {
                this.statuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.formatService.query().subscribe(
            (res: HttpResponse<IFormat[]>) => {
                this.formats = res.body;
                if (this.post.id === undefined) {
                    this.postEditFormGroup.controls['formatId'].setValue(this.formats.find(format => format.name === 'Standard').id);
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.principal.identity().then(account => {
            this.account = account;
        });
    }

    createPostEditFormGroup() {
        this.postEditFormGroup = this.fb.group({
            id: [this.post.id || ''],
            title: [this.post.title || '', Validators.required],
            content: [this.post.content || '', Validators.required],
            excerpt: [this.post.excerpt || '', Validators.required],
            featured: [this.post.featured || false],
            sticky: [this.post.sticky || false],
            updates: [this.post.updates || ''],
            slug: [this.post.slug || 'place-holder-slug', Validators.required], // 'place-holder-slug' is done to make validation work.
            featuredMedia: [this.post.featuredMedia || ''],
            subTitle: [this.post.subTitle || ''],
            formatId: [this.post.formatId || '', Validators.required],
            statusId: [this.post.statusId || null],
            statusName: [this.post.statusName || ''],
            categories: [this.post.categories], // convert into this.fb.array
            tags: [this.post.tags], // convert into this.fb.array
            degaUsers: [this.post.degaUsers || '', Validators.required], // convert into this.fb.array
            clientId: [this.post.clientId || ''], // delete once backend is fixed
            publishedDate: [this.post.publishedDate || null], // delete once backend is fixed
            createdDate: [this.post.createdDate || null] // delete once backend is fixed
        });
    }

    getAllTags() {
        this.searchTagKeyword = '';
        this.searchTagTotalResult = 0;
        this.searchTagCurrentPage = 0;
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
            clientId: [''],
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
                const newlyAddedTag = this.processOptionToDesireCheckboxFormat([res.body], 'name')[0];
                this.selected_tag_options = [newlyAddedTag, ...this.selected_tag_options];
                this.tagListContainer = true;
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
                this.currentUser = this.degausers
                    .filter(u => {
                        const found = u.email === this.account.email;
                        return found;
                    })
                    .shift();
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
            clientId: [''],
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
                this.isSaving = false;
            },
            (res: HttpErrorResponse) => {
                this.onSaveError();
                this.isSaving = false;
            }
        );
    }

    updatePostContentFormData(data) {
        this.post.content = data['html'];
        this.postEditFormGroup.controls['content'].setValue(data['html']);
    }

    choseMediaforFeature() {
        const config = {
            height: '90%',
            width: '90vw',
            maxWidth: '90vw'
        };
        const dialogRef = this.dialog.open(QuillEditorFileUploadComponent, config);

        dialogRef.afterClosed().subscribe(image_data => {
            if (image_data) {
                this.updateMediaForFeature(image_data['url']);
            }
        });
    }

    updateMediaForFeature(url) {
        this.postEditFormGroup.controls['featuredMedia'].setValue(url);
    }

    deleteMediaForFeature() {
        this.postEditFormGroup.controls['featuredMedia'].setValue('');
    }

    previousState() {
        this.route.navigate(['/post']);
    }

    saveOrPublish(statusName) {
        if (this.postEditFormGroup.invalid) {
            const invalid = [];
            const controls = this.postEditFormGroup.controls;
            for (const name in controls) {
                if (controls[name].invalid) {
                    invalid.push(name);
                }
            }
            alert(invalid + ' is required');
            return;
        }
        this.isSaving = true;
        this.postEditFormGroup.value.statusName = statusName;
        if (this.postEditFormGroup.value.id !== '') {
            this.subscribeToSaveResponse(this.postService.update(this.postEditFormGroup.value));
        } else {
            delete this.postEditFormGroup.value.id;
            this.postEditFormGroup.value.slug = '';
            this.subscribeToSaveResponse(this.postService.create(this.postEditFormGroup.value));
        }
    }

    showSaveButton(degausersRole: String): boolean {
        return AUTHOR_ROLE.includes(degausersRole);
    }

    showPublishButton(degausersRole: String): boolean {
        return PUBLISHER_ROLE.includes(degausersRole);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPost>>) {
        result.subscribe((res: HttpResponse<IPost>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
        this.postEditFormGroup.controls['tags'].setValue(this.processTagToBackendRequiredFormat(val));
    }

    update_category_selection(val) {
        this.postEditFormGroup.controls['categories'].setValue(this.processCategoryToBackendRequiredFormat(val));
    }

    update_author_selection(val) {
        this.postEditFormGroup.controls['degaUsers'].setValue(this.processAuthorToBackendRequiredFormat(val));
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
