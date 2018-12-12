import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IFormat } from 'app/shared/model/core/format.model';
import { FormatService } from './format.service';

@Component({
    selector: 'jhi-format-update',
    templateUrl: './format-update.component.html'
})
export class FormatUpdateComponent implements OnInit {
    format: IFormat;
    isSaving: boolean;
    createdDate: string;
    lastUpdatedDate: string;
    slug: string;
    slugExtention: number;
    tempSlug: string;

    constructor(private formatService: FormatService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ format }) => {
            this.format = format;
            this.createdDate = this.format.createdDate != null ? this.format.createdDate.format(DATE_TIME_FORMAT) : null;
            this.lastUpdatedDate = this.format.lastUpdatedDate != null ? this.format.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.format.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.format.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
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

    bindSlug(event: any) {
        this.slugExtention = 0;
        this.slug = event.target.value.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
        this.tempSlug = this.slug;
        this.createSlug();
    }
    createSlug() {
        if (this.slug) {
            this.formatService.getFormatBySlug(this.slug).subscribe((res: HttpResponse<IFormat>) => {
                if (res.body) {
                    this.slugExtention += 1;
                    this.slug = this.tempSlug + this.slugExtention;
                    this.createSlug();
                }
                this.format.slug = this.slug;
            });
        }
    }
}
