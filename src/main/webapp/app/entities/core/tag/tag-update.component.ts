import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ITag } from 'app/shared/model/core/tag.model';
import { TagService } from './tag.service';
import { IPost } from 'app/shared/model/core/post.model';
import { PostService } from 'app/entities/core/post';

@Component({
    selector: 'jhi-tag-update',
    templateUrl: './tag-update.component.html'
})
export class TagUpdateComponent implements OnInit {
    tag: ITag;
    isSaving: boolean;

    posts: IPost[];
    createdDate: string;
    lastUpdatedDate: string;
    slug: string;
    slugExtention: number;
    tempSlug: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private tagService: TagService,
        private postService: PostService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tag }) => {
            this.tag = tag;
            this.createdDate = this.tag.createdDate != null ? this.tag.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.tag.lastUpdatedDate != null ? this.tag.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.postService.query().subscribe(
            (res: HttpResponse<IPost[]>) => {
                this.posts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.tag.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.tag.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        if (this.tag.id !== undefined) {
            this.subscribeToSaveResponse(this.tagService.update(this.tag));
        } else {
            this.subscribeToSaveResponse(this.tagService.create(this.tag));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITag>>) {
        result.subscribe((res: HttpResponse<ITag>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPostById(index: number, item: IPost) {
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

    bindSlug(event: any) {
        this.slugExtention = 0;
        this.slug = event.target.value.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
        this.tempSlug = this.slug;
        this.createSlug();
    }
    createSlug() {
        if (this.slug) {
            this.tagService.getTagBySlug(this.slug).subscribe((res: HttpResponse<ITag>) => {
                if (res.body) {
                    this.slugExtention += 1;
                    this.slug = this.tempSlug + this.slugExtention;
                    this.createSlug();
                }
                this.tag.slug = this.slug;
            });
        }
    }
}
