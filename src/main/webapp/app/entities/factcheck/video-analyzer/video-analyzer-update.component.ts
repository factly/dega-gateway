import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRating } from 'app/shared/model/factcheck/rating.model';
import { VideoAnalyzerService } from './video-analyzer.service';
import { ADMIN_ROLE } from 'app/shared/constants/role.constants';

import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { JhiAlertService } from 'ng-jhipster';

import { IVideoAnalyzer } from 'app/shared/model/factcheck/video-analyzer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'jhi-rating-update',
    templateUrl: './video-analyzer-update.component.html'
})
export class VideoAnalyzerUpdateComponent implements OnInit {
    videoData: IVideoAnalyzer;
    videoAnalysisData: any[];

    isSaving: boolean;

    videoFormGroup: FormGroup;
    videoAnalysisFormGroup: FormGroup;

    constructor(
        private jhiAlertService: JhiAlertService,
        private videoAnalyzerService: VideoAnalyzerService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.videoFormGroup = this.fb.group({
            id: [this.videoData.id || ''],
            title: [this.videoData.title || '', Validators.required],
            description: [this.videoData.description || '', Validators.required],
            status_id: [this.videoData.status.id || '', Validators.required]
        });
    }

    previousState() {
        window.history.back();
    }

    saveVideoData() {
        this.isSaving = true;
        if (this.videoFormGroup.value.id !== undefined) {
            this.subscribeToSaveResponse(this.videoAnalyzerService.update(this.videoFormGroup.value));
        } else {
            this.subscribeToSaveResponse(this.videoAnalyzerService.create(this.videoFormGroup.value));
        }
    }

    saveVideoAnalysisData() {
        this.isSaving = true;
        if (this.videoFormGroup.value.id !== undefined) {
            this.subscribeToSaveResponse(this.videoAnalyzerService.update(this.videoFormGroup.value));
        } else {
            this.subscribeToSaveResponse(this.videoAnalyzerService.create(this.videoFormGroup.value));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVideoAnalyzer>>) {
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

    showClientIdField(degausersRole: String): boolean {
        return ADMIN_ROLE.includes(degausersRole);
    }
}
