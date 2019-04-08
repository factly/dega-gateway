import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PUBLISHER_ROLE } from 'app/shared/constants/role.constants';
import { AUTHOR_ROLE } from 'app/shared/constants/role.constants';
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
import { MediaService } from '../media/media.service';
import { Principal, Account } from 'app/core';

import { Subscription } from 'rxjs';

@Component({
    selector: 'jhi-post-update',
    templateUrl: './post-update.component.html'
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

    quillEditorRef; // Quill editor reference obj
    subscription: Subscription;
    range_1;
    range_2;

    constructor(
        private jhiAlertService: JhiAlertService,
        private postService: PostService,
        private tagService: TagService,
        private categoryService: CategoryService,
        private statusService: StatusService,
        private formatService: FormatService,
        private degaUserService: DegaUserService,
        private activatedRoute: ActivatedRoute,
        private mediaService: MediaService,
        private principal: Principal,
        private router: Router
    ) {
        this.subscription = this.mediaService.getProductID().subscribe(message => {
            if (message['type_of_data'] === 'quill') {
                this.updateMediaForQuill_1(message['selected_url']);
            }
            if (message['type_of_data'] === 'feature') {
                this.updateMediaForFeature(message['selected_url']);
            }
        });
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ post }) => {
            this.post = post;
            this.publishedDate = this.post.publishedDate != null ? this.post.publishedDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.post.lastUpdatedDate != null ? this.post.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
            this.createdDate = this.post.createdDate != null ? this.post.createdDate.format(DATE_TIME_FORMAT) : null;
        });
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
        this.degaUserService.query().subscribe(
            (res: HttpResponse<IDegaUser[]>) => {
                this.degausers = res.body;
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
        if (this.post.id === undefined || this.post.featuredMedia === undefined) {
            this.mediaService.setImageSrcUrl(null);
        } else {
            this.mediaService.setImageSrcUrl(this.post.featuredMedia);
        }
    }

    getEditorInstance(editorInstance: any) {
        this.quillEditorRef = editorInstance;
        const toolbar = editorInstance.getModule('toolbar');
        toolbar.addHandler('image', this.openDialog.bind(this));
    }

    openDialog() {
        this.range_1 = this.quillEditorRef.getSelection();
        console.log('working');
        this.router.navigate([{ outlets: { popup: 'featured-media/upload' } }], { queryParams: { media_type: 'quill' }, replaceUrl: true });
    }
    updateMediaForQuill_1(url) {
        const img = '<img src="' + url + '" />';
        this.quillEditorRef.clipboard.dangerouslyPasteHTML(this.range_1.index, img);
    }

    updateMediaForFeature(url) {
        this.post.featuredMedia = url;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.post.publishedDate = this.publishedDate != null ? moment(this.publishedDate, DATE_TIME_FORMAT) : null;
        this.post.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        this.post.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        if (this.post.id !== undefined) {
            this.post.statusName = 'Draft';
            this.subscribeToSaveResponse(this.postService.update(this.post));
        } else {
            this.subscribeToSaveResponse(this.postService.create(this.post));
        }
    }

    publish() {
        this.isSaving = true;
        this.post.publishedDate = this.publishedDate != null ? moment(this.publishedDate, DATE_TIME_FORMAT) : null;
        this.post.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        if (this.post.id !== undefined) {
            this.post.statusName = 'Publish';
            this.subscribeToSaveResponse(this.postService.update(this.post));
        } else {
            this.subscribeToSaveResponse(this.postService.publish(this.post));
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

    trackTagById(index: number, item: ITag) {
        return item.id;
    }

    trackCategoryById(index: number, item: ICategory) {
        return item.id;
    }

    trackStatusById(index: number, item: IStatus) {
        return item.id;
    }

    trackFormatById(index: number, item: IFormat) {
        return item.id;
    }

    trackDegaUserById(index: number, item: IDegaUser) {
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

    // getImageSrcUrl() {
    // this.post.featuredMedia = this.mediaService.getImageSrcUrl();
    // }
}
