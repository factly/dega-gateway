import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPost } from 'app/shared/model/core/post.model';
import { PostService } from './post.service';

import { CategoryService } from '../category/category.service';
import { ICategory } from 'app/shared/model/core/category.model';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITag } from 'app/shared/model/core/tag.model';
import { TagService } from '../tag/tag.service';

@Component({
    selector: 'jhi-post-update',
    templateUrl: './post-update.component.html'
})
export class PostUpdateComponent implements OnInit {
    private _post: IPost;
    isSaving: boolean;
    categories: ICategory[];
    tags: ITag[];

    constructor(
        private postService: PostService,
        private activatedRoute: ActivatedRoute,
        private categoryService: CategoryService,
        private tagService: TagService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.loadCategories();
        this.loadTags();
        this.activatedRoute.data.subscribe(({ post }) => {
            this.post = post;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.post.id !== undefined) {
            this.subscribeToSaveResponse(this.postService.update(this.post));
        } else {
            this.subscribeToSaveResponse(this.postService.create(this.post));
        }
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
    get post() {
        return this._post;
    }

    set post(post: IPost) {
        this._post = post;
    }

    loadCategories() {
        this.categoryService
            .query({
                sort: ['asc']
            })
            .subscribe(
                (res: HttpResponse<ICategory[]>) => (this.categories = res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadTags() {
        this.tagService
            .query({
                sort: ['asc']
            })
            .subscribe((res: HttpResponse<ITag[]>) => (this.tags = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
