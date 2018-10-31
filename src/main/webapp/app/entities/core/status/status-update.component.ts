import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IStatus } from 'app/shared/model/core/status.model';
import { StatusService } from './status.service';

@Component({
    selector: 'jhi-status-update',
    templateUrl: './status-update.component.html'
})
export class StatusUpdateComponent implements OnInit {
    status: IStatus;
    isSaving: boolean;

    constructor(private statusService: StatusService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ status }) => {
            this.status = status;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
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
}
