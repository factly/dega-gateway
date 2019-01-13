import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IStatus } from 'app/shared/model/core/status.model';
import { StatusService } from './status.service';

@Component({
    selector: 'jhi-status-update',
    templateUrl: './status-update.component.html'
})
export class StatusUpdateComponent implements OnInit {
    status: IStatus;
    isSaving: boolean;
    createdDate: string;
    lastUpdatedDate: string;
    slug: string;
    slugExtention: number;
    tempSlug: string;

    constructor(private statusService: StatusService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ status }) => {
            this.status = status;
            this.createdDate = this.status.createdDate != null ? this.status.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.status.lastUpdatedDate != null ? this.status.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.status.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.status.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        if (this.status.id !== undefined) {
            this.subscribeToSaveResponse(this.statusService.update(this.status));
        } else {
            this.subscribeToSaveResponse(this.statusService.create(this.status));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStatus>>) {
        result.subscribe((res: HttpResponse<IStatus>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    bindSlug(event: any) {
        this.slugExtention = 0;
        this.slug = event.target.value
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-')
            .toLowerCase();
        this.tempSlug = this.slug;
        this.createSlug();
    }
    createSlug() {
        if (this.slug) {
            this.statusService.getStatusBySlug(this.slug).subscribe((res: HttpResponse<IStatus>) => {
                if (res.body) {
                    this.slugExtention += 1;
                    this.slug = this.tempSlug + this.slugExtention;
                    this.createSlug();
                }
                this.status.slug = this.slug;
            });
        }
    }
}
