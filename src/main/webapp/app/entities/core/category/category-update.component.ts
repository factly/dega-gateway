import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICategory } from 'app/shared/model/core/category.model';
import { CategoryService } from './category.service';
import { IPost } from 'app/shared/model/core/post.model';
import { PostService } from 'app/entities/core/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'jhi-category-update',
    templateUrl: './category-update.component.html'
})
export class CategoryUpdateComponent implements OnInit {
    category: ICategory;
    isSaving: boolean;

    posts: IPost[];
    createdDate: string;
    lastUpdatedDate: string;
    slug: string;
    slugExtention: number;
    tempSlug: string;

    categoryFormGroup: FormGroup;
    constructor(
        private jhiAlertService: JhiAlertService,
        private categoryService: CategoryService,
        private postService: PostService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ category }) => {
            this.category = category;
            // this.createdDate = this.category.createdDate != null ? this.category.createdDate.format(DATE_TIME_FORMAT) : null;
            // this.lastUpdatedDate = this.category.lastUpdatedDate != null ? this.category.lastUpdatedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.postService.query().subscribe(
            (res: HttpResponse<IPost[]>) => {
                this.posts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.createCategoryFormGroup();
    }

    previousState() {
        window.history.back();
    }
    createCategoryFormGroup() {
        this.categoryFormGroup = this.fb.group({
            id: [this.category.id || ''],
            name: [this.category.name || '', Validators.required],
            description: [this.category.description || '', Validators.required],
            slug: [this.category.slug || ''],
            parent: [this.category.parent || ''],
            clientId: [this.category.clientId || ''],
            createdDate: [this.category.createdDate || ''],
            lastUpdatedDate: [this.category.lastUpdatedDate || '']
        });
    }

    save() {
        if (this.categoryFormGroup.invalid) {
            const invalid = [];
            const controls = this.categoryFormGroup.controls;
            for (const name in controls) {
                if (controls[name].invalid) {
                    invalid.push(name);
                }
            }
            alert(invalid + 'is required');
            return;
        }
        this.isSaving = true;
        this.categoryFormGroup.value.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_TIME_FORMAT) : null;
        this.categoryFormGroup.value.lastUpdatedDate = this.lastUpdatedDate != null ? moment(this.lastUpdatedDate, DATE_TIME_FORMAT) : null;
        if (this.category.id !== undefined) {
            this.subscribeToSaveResponse(this.categoryService.update(this.categoryFormGroup.value));
        } else {
            delete this.categoryFormGroup.value.id;
            this.subscribeToSaveResponse(this.categoryService.create(this.categoryFormGroup.value));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICategory>>) {
        result.subscribe((res: HttpResponse<ICategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPostById(index: number, item: IPost) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
