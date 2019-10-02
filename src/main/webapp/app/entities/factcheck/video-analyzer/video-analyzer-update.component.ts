import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRating } from 'app/shared/model/factcheck/rating.model';
import { VideoAnalyzerService } from './video-analyzer.service';

import { JhiAlertService } from 'ng-jhipster';

import { IVideo, IVideoAnalysis } from 'app/shared/model/factcheck/video-analyzer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusService } from 'app/entities/core/status';
import { IStatus } from 'app/shared/model/core/status.model';

@Component({
    selector: 'jhi-video-analyzer-update',
    templateUrl: './video-analyzer-update.component.html'
})
export class VideoAnalyzerUpdateComponent implements OnInit {
    videoData: IVideo;
    videoAnalysisData: IVideoAnalysis[];
    statuses: IStatus[];

    isSaving: boolean;

    videoFormGroup: FormGroup;
    videoAnalysisFormGroup: FormGroup;

    constructor(
        private jhiAlertService: JhiAlertService,
        private statusService: StatusService,
        private videoAnalyzerService: VideoAnalyzerService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(
            ({ videoData }) => {
                this.videoData = videoData;
                if (this.videoData._id) {
                    this.videoAnalyzerService.findVideoAnalysis(this.videoData['_id']).subscribe(
                        (res: HttpResponse<IVideoAnalysis[]>) => {
                            this.videoAnalysisData = res.body;
                        },
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.createFormGroups();
        this.statusService.query().subscribe(
            (res: HttpResponse<IStatus[]>) => {
                this.statuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    createFormGroups() {
        this.videoFormGroup = this.fb.group({
            _id: [this.videoData._id || ''],
            title: [this.videoData.title || '', Validators.required],
            description: [this.videoData.description || '', Validators.required],
            link: [this.videoData.link || '', Validators.required],
            slug: [this.videoData.slug || '', Validators.required],
            status_id: [this.videoData.status || '', Validators.required]
        });
    }

    previousState() {
        window.history.back();
    }

    saveVideoData() {
        this.isSaving = true;
        if (this.videoFormGroup.value._id) {
            this.subscribeToSaveResponse(this.videoAnalyzerService.updateVideo(this.videoFormGroup.value));
        } else {
            this.videoFormGroup.controls['slug'].setValue(this.transformToSlug(this.videoFormGroup.value.title));
            this.subscribeToSaveResponse(this.videoAnalyzerService.createVideo(this.videoFormGroup.value));
        }
    }

    transformToSlug(input: string): string {
        return input
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    }

    saveVideoAnalysisData() {
        this.isSaving = true;
        if (this.videoAnalysisFormGroup.value.id !== undefined) {
            this.subscribeToSaveResponse(
                this.videoAnalyzerService.updateVideoAnalysis(this.videoData._id, this.videoAnalysisFormGroup.value)
            );
        } else {
            this.subscribeToSaveResponse(this.videoAnalyzerService.createVideoAnalysis(this.videoAnalysisFormGroup.value));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVideo>>) {
        result.subscribe((res: HttpResponse<IRating>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    updateReviewFormData(data) {
        this.videoFormGroup.controls['description'].setValue(data['html']);
    }
}
