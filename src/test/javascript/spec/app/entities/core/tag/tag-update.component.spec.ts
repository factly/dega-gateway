/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { GatewayTestModule } from '../../../../test.module';
import { TagUpdateComponent } from 'app/entities/core/tag/tag-update.component';
import { TagService } from 'app/entities/core/tag/tag.service';
import { Tag } from 'app/shared/model/core/tag.model';

describe('Component Tests', () => {
    describe('Tag Management Update Component', () => {
        let comp: TagUpdateComponent;
        let fixture: ComponentFixture<TagUpdateComponent>;
        let service: TagService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule, ReactiveFormsModule],
                declarations: [TagUpdateComponent]
            })
                .overrideTemplate(TagUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TagUpdateComponent);
            comp = fixture.componentInstance;
            comp.tag = new Tag('123');
            comp.createTagFormGroup();
            service = fixture.debugElement.injector.get(TagService);
        });

        function createTagFormGroup() {
            comp.tagFormGroup.controls['name'].setValue('testing title');
            comp.tagFormGroup.controls['description'].setValue('testing content');
        }

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Tag('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.tag = entity;
                // WHEN
                createTagFormGroup();
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(comp.tagFormGroup.value);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Tag();
                comp.tag = entity;
                comp.createTagFormGroup();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                // WHEN
                createTagFormGroup();
                comp.save();
                tick(); // simulate async

                // THEN
                expect(comp.tagFormGroup.value).toEqual(entity);
                expect(service.create).toHaveBeenCalledWith(comp.tagFormGroup.value);
                expect(comp.isSaving).toBeFalsy();
            }));

            it('Should should give alert error on save function', fakeAsync(() => {
                // GIVEN
                comp.tag = new Tag();
                comp.createTagFormGroup();
                spyOn(window, 'alert').and.returnValue(null);
                // WHEN
                createTagFormGroup();
                // Marking name field as invalid
                comp.tagFormGroup.controls['name'].setValue('');
                comp.save();
                tick(); // simulate async

                // THEN
                expect(alert).toHaveBeenCalledWith('name is required');
                expect(comp.isSaving).toBeFalsy();
            }));
        });
    });
});
