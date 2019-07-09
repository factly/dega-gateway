/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CategoryUpdateComponent } from 'app/entities/core/category/category-update.component';
import { CategoryService } from 'app/entities/core/category/category.service';
import { Category } from 'app/shared/model/core/category.model';
import { ReactiveFormsModule } from '@angular/forms';

describe('Component Tests', () => {
    describe('Category Management Update Component', () => {
        let comp: CategoryUpdateComponent;
        let fixture: ComponentFixture<CategoryUpdateComponent>;
        let service: CategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule, ReactiveFormsModule],
                declarations: [CategoryUpdateComponent]
            })
                .overrideTemplate(CategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CategoryUpdateComponent);
            comp = fixture.componentInstance;
            comp.category = new Category('123');
            comp.createCategoryFormGroup();
            service = fixture.debugElement.injector.get(CategoryService);
        });

        function createCategoryEditFormGroup(valid) {
            comp.categoryFormGroup.controls['name'].setValue('testing title');
            comp.categoryFormGroup.controls['description'].setValue('testing content');
            comp.categoryFormGroup.controls['slug'].setValue('testing excerpt');
            comp.categoryFormGroup.controls['parent'].setValue('testing updates');
            comp.categoryFormGroup.controls['clientId'].setValue('testing slug');
            if (!valid) {
                comp.categoryFormGroup.controls['title'].setValue('');
            }
        }

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Category('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.category = entity;
                // WHEN
                createCategoryEditFormGroup(true);
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(comp.categoryFormGroup.value);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Category();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.category = entity;
                // WHEN
                createCategoryEditFormGroup(true);
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(comp.categoryFormGroup.value);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
