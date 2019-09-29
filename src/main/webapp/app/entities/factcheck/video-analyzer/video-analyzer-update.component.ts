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
import { ICategory } from 'app/shared/model/core/category.model';

@Component({
    selector: 'jhi-rating-update',
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
                this.videoAnalyzerService.findVideoAnalysis(this.videoData['_id']).subscribe(
                    (res: HttpResponse<ICategory[]>) => {
                        this.videoAnalysisData = res.body;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.createFormGroups();
        this.statusService.query().subscribe(
            (res: HttpResponse<IStatus[]>) => {
                this.statuses = res.body;
                console.log(res.body);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    createFormGroups() {
        this.videoFormGroup = this.fb.group({
            id: [this.videoData.id || ''],
            title: [this.videoData.title || '', Validators.required],
            description: [this.videoData.description || '', Validators.required],
            link: [this.videoData.link || '', Validators.required],
            status_id: [this.videoData.status.id || '', Validators.required]
        });
    }

    previousState() {
        window.history.back();
    }

    saveVideoData() {
        this.isSaving = true;
        if (this.videoFormGroup.value.id !== undefined) {
            this.subscribeToSaveResponse(this.videoAnalyzerService.updateVideo(this.videoFormGroup.value));
        } else {
            this.subscribeToSaveResponse(this.videoAnalyzerService.createVideo(this.videoFormGroup.value));
        }
    }

    saveVideoAnalysisData() {
        this.isSaving = true;
        if (this.videoAnalysisFormGroup.value.id !== undefined) {
            this.subscribeToSaveResponse(
                this.videoAnalyzerService.updateVideoAnalysis(this.videoData.id, this.videoAnalysisFormGroup.value)
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
