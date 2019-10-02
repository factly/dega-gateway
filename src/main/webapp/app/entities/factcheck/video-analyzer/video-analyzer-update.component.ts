import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRating, Rating } from 'app/shared/model/factcheck/rating.model';
import { VideoAnalyzerService } from './video-analyzer.service';

import { JhiAlertService } from 'ng-jhipster';

import { IVideo, IVideoAnalysis, VideoAnalysis } from 'app/shared/model/factcheck/video-analyzer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusService } from 'app/entities/core/status';
import { IStatus } from 'app/shared/model/core/status.model';
import { RatingService } from 'app/entities/factcheck/rating';

@Component({
    selector: 'jhi-video-analyzer-update',
    templateUrl: './video-analyzer-update.component.html'
})
export class VideoAnalyzerUpdateComponent implements OnInit {
    videoData: IVideo;
    videoAnalysisData: IVideoAnalysis[];
    statuses: IStatus[];
    ratings: IRating[];

    isSaving: boolean;
    showAnalysisForm: boolean = false;

    videoFormGroup: FormGroup;
    videoAnalysisFormGroup: FormGroup;

    constructor(
        private jhiAlertService: JhiAlertService,
        private statusService: StatusService,
        private ratingService: RatingService,
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
                            this.toggleVideoForm();
                            this.sortVideoAnalysis();
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
        this.ratingService.query().subscribe(
            (res: HttpResponse<IRating[]>) => {
                this.ratings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    toggleVideoForm() {
        if (this.videoFormGroup.disabled) {
            this.videoFormGroup.enable();
        } else {
            this.videoFormGroup.disable();
        }
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

    createVideoAnalysisForm(savedVideoAnalysisData: IVideoAnalysis) {
        if (!savedVideoAnalysisData) {
            savedVideoAnalysisData = new VideoAnalysis();
            savedVideoAnalysisData.rating = new Rating();
        }

        this.videoAnalysisFormGroup = this.fb.group({
            _id: [savedVideoAnalysisData._id || ''],
            shown_title: [savedVideoAnalysisData.shown_title || '', Validators.required],
            shown_description: [savedVideoAnalysisData.shown_description || '', Validators.required],
            link: [savedVideoAnalysisData.link || '', Validators.required],
            reality_title: [savedVideoAnalysisData.reality_title || '', Validators.required],
            reality_description: [savedVideoAnalysisData.reality_description || '', Validators.required],
            reality_source: [savedVideoAnalysisData.reality_source || '', Validators.required],
            rating_id: [savedVideoAnalysisData.rating.id || '', Validators.required],
            end_time_in_sec: [savedVideoAnalysisData.end_time_in_sec || 0, Validators.required],
            video_id: [this.videoData._id]
        });
        if (savedVideoAnalysisData._id) {
            this.videoAnalysisFormGroup.controls['rating_id'].setValue(savedVideoAnalysisData.rating['$id']);
        }
        this.showAnalysisForm = true;
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
        if (this.videoAnalysisFormGroup.value._id) {
            this.subscribeToSaveVideoAnalysisResponse(
                this.videoAnalyzerService.updateVideoAnalysis(this.videoAnalysisFormGroup.value._id, this.videoAnalysisFormGroup.value),
                'update'
            );
        } else {
            this.subscribeToSaveVideoAnalysisResponse(
                this.videoAnalyzerService.createVideoAnalysis(this.videoAnalysisFormGroup.value),
                'create'
            );
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVideo>>) {
        result.subscribe((res: HttpResponse<IRating>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private subscribeToSaveVideoAnalysisResponse(result: Observable<HttpResponse<IVideoAnalysis>>, typeOfOperation: string) {
        result.subscribe(
            (res: HttpResponse<IRating>) => this.onSaveSuccessVideoAnalysis(res, typeOfOperation),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccessVideoAnalysis(res, typeOfOperation) {
        if (typeOfOperation == 'update') {
            this.videoAnalysisData = this.videoAnalysisData.filter(item => item._id !== res.body['data']['value']['_id']);
            this.videoAnalysisData.push(res.body['data']['value']);
        } else {
            this.videoAnalysisData = this.videoAnalysisData.concat(res.body['data']['ops']);
        }

        this.sortVideoAnalysis();
        this.showAnalysisForm = false;
    }

    private sortVideoAnalysis() {
        this.videoAnalysisData = this.videoAnalysisData.sort((obj1, obj2) => {
            if (obj1.end_time_in_sec > obj2.end_time_in_sec) {
                return 1;
            }

            if (obj1.end_time_in_sec < obj2.end_time_in_sec) {
                return -1;
            }

            return 0;
        });
    }

    private onSaveSuccess() {
        this.isSaving = false;
        // this.previousState();
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
