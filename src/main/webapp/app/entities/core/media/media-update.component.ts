import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMedia } from 'app/shared/model/core/media.model';
import { MediaService } from './media.service';

@Component({
    selector: 'jhi-media-update',
    templateUrl: './media-update.component.html'
})
export class MediaUpdateComponent implements OnInit {
    media: IMedia;
    isSaving: boolean;
    publishedDate: string;
    lastUpdatedDate: string;
    createdDate: string;

    constructor(private mediaService: MediaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ media }) => {
            this.media = media;
            this.publishedDate = this.media.publishedDate != null ? this.media.publishedDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.media.lastUpdatedDate != null ? this.media.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
            this.createdDate = this.media.createdDate != null ? this.media.createdDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.media.publishedDate = this.publishedDate != null ? moment(this.publishedDate, DATE_TIME_FORMAT) : null;
        this.media.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        this.media.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        if (this.media.id !== undefined) {
            this.subscribeToSaveResponse(this.mediaService.update(this.media));
        } else {
            this.subscribeToSaveResponse(this.mediaService.create(this.media));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMedia>>) {
        result.subscribe((res: HttpResponse<IMedia>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
