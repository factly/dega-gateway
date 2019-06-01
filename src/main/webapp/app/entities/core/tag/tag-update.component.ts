import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITag } from 'app/shared/model/core/tag.model';
import { TagService } from './tag.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'jhi-tag-update',
    templateUrl: './tag-update.component.html'
})
export class TagUpdateComponent implements OnInit {
    tag: ITag;
    isSaving: boolean;
    tagFormGroup: FormGroup;

    constructor(
        private jhiAlertService: JhiAlertService,
        private tagService: TagService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private route: Router
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tag }) => {
            this.tag = tag;
        });
        this.createTagFormGroup();
    }

    createTagFormGroup() {
        this.tagFormGroup = this.fb.group({
            id: [this.tag.id || ''],
            name: [this.tag.name || '', Validators.required],
            slug: [this.tag.slug || ''],
            description: [this.tag.description || '', Validators.required],
            clientId: [this.tag.clientId || ''],
            createdDate: [this.tag.createdDate || '']
        });
    }

    previousState() {
        this.route.navigate(['/tag']);
    }

    save() {
        if (this.tagFormGroup.invalid) {
            const invalid = [];
            const controls = this.tagFormGroup.controls;
            for (const name in controls) {
                if (controls[name].invalid) {
                    invalid.push(name);
                }
            }
            alert(invalid + ' is required');
            return;
        }
        this.isSaving = true;
        if (this.tagFormGroup.value.id !== undefined) {
            this.subscribeToSaveResponse(this.tagService.update(this.tagFormGroup.value));
        } else {
            this.subscribeToSaveResponse(this.tagService.create(this.tagFormGroup.value));
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
}
