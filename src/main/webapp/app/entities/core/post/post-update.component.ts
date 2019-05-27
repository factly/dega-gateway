import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
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
import { MediaService } from '../media/media.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    slug: string;
    slugExtention: number;
    tempSlug: string;
    account: Account;
    postEditFormGroup: FormGroup;

    subscription;

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

    constructor(
        private jhiAlertService: JhiAlertService,
        private postService: PostService,
        private tagService: TagService,
        private categoryService: CategoryService,
        private statusService: StatusService,
        private mediaService: MediaService,
        private formatService: FormatService,
        private degaUserService: DegaUserService,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private fb: FormBuilder
    ) {
        this.subscription = this.mediaService.getProductID().subscribe(message => {
            if (message['type_of_data'] === 'feature') {
                this.updateMediaForFeature(message['selected_url']);
            }
        });
    }

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
        this.postEditFormGroup = this.fb.group({
            id: [this.post.id || ''],
            title: [this.post.title || '', Validators.required],
            content: [this.post.content || '', Validators.required],
            excerpt: [this.post.excerpt || '', Validators.required],
            featured: [this.post.featured || false],
            sticky: [this.post.sticky || false],
            updates: [this.post.updates || '', Validators.required],
            slug: [this.post.slug || '', Validators.required],
            featuredMedia: [this.post.featuredMedia || ''],
            subTitle: [this.post.subTitle || ''],
            formatId: [this.post.formatId || '', Validators.required],
            statusId: [this.post.statusId || ''],
            statusName: [this.post.statusName || ''],
            categories: [this.post.categories], // convert into this.fb.array
            tags: [this.post.tags], // convert into this.fb.array
            degaUsers: [this.post.degaUsers || '', Validators.required], // convert into this.fb.array
            clientId: [this.post.clientId || ''], // delete once backend is fixed
            publishedDate: [this.post.publishedDate || null], // delete once backend is fixed
            createdDate: [this.post.createdDate || null] // delete once backend is fixed
        });
        this.getAllDegaUsers();
        this.getAllCategories();
        this.getAllTags();
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
                    this.post.formatId = this.formats.find(format => format.name === 'Standard').id;
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.principal.identity().then(account => {
            this.account = account;
        });
    }

    getAllTags() {
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

    getAllDegaUsers() {
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
        this.categoryService.query().subscribe(
            (res: HttpResponse<ICategory[]>) => {
                this.categories = res.body;
                this.backend_compatible_category_list = res.body;
                this.all_category_options = this.processOptionToDesireCheckboxFormat(this.backend_compatible_category_list, 'name');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    updatePostContentFormData(data) {
        this.post.content = data['html'];
    }

    updateMediaForFeature(url) {
        this.post.featuredMedia = url;
    }

    previousState() {
        window.history.back();
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
        if (this.postEditFormGroup.value.id !== undefined) {
            this.subscribeToSaveResponse(this.postService.update(this.postEditFormGroup.value));
        } else {
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
