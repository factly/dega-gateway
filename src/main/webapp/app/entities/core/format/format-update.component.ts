import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFormat } from 'app/shared/model/core/format.model';
import { FormatService } from './format.service';

@Component({
    selector: 'jhi-format-update',
    templateUrl: './format-update.component.html'
})
export class FormatUpdateComponent implements OnInit {
    format: IFormat;
    isSaving: boolean;

    constructor(private formatService: FormatService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ format }) => {
            this.format = format;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.format.id !== undefined) {
            this.subscribeToSaveResponse(this.formatService.update(this.format));
        } else {
            this.subscribeToSaveResponse(this.formatService.create(this.format));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFormat>>) {
        result.subscribe((res: HttpResponse<IFormat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
