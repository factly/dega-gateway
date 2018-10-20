import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICategory } from 'app/shared/model/core/category.model';
import { CategoryService } from './category.service';

@Component({
    selector: 'jhi-category-update',
    templateUrl: './category-update.component.html'
})
export class CategoryUpdateComponent implements OnInit {
    private _category: ICategory;
    isSaving: boolean;

    constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ category }) => {
            this.category = category;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.category.id !== undefined) {
            this.subscribeToSaveResponse(this.categoryService.update(this.category));
        } else {
            this.subscribeToSaveResponse(this.categoryService.create(this.category));
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
    get category() {
        return this._category;
    }

    set category(category: ICategory) {
        this._category = category;
    }
}
