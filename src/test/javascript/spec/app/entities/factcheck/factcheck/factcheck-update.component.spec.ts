/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { FactcheckUpdateComponent } from 'app/entities/factcheck/factcheck/factcheck-update.component';
import { FactcheckService } from 'app/entities/factcheck/factcheck/factcheck.service';
import { Factcheck } from 'app/shared/model/factcheck/factcheck.model';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

describe('Component Tests', () => {
    describe('Factcheck Management Update Component', () => {
        let comp: FactcheckUpdateComponent;
        let fixture: ComponentFixture<FactcheckUpdateComponent>;
        let service: FactcheckService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule, FormsModule, ReactiveFormsModule, MatDialogModule],
                declarations: [FactcheckUpdateComponent],
                providers: [FormBuilder]
            })
                .overrideTemplate(FactcheckUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FactcheckUpdateComponent);
            comp = fixture.componentInstance;
            comp.factcheck = new Factcheck('123');
            comp.createFactCheckEditFormGroup();
            service = fixture.debugElement.injector.get(FactcheckService);
        });

        function createFactCheckEditFormGroup() {
            comp.factCheckEditFormGroup.controls['title'].setValue('testing title');
            comp.factCheckEditFormGroup.controls['introduction'].setValue('testing content');
            comp.factCheckEditFormGroup.controls['excerpt'].setValue('testing excerpt');
            comp.factCheckEditFormGroup.controls['summary'].setValue('testing updates');
            comp.factCheckEditFormGroup.controls['degaUsers'].setValue([{ id: '123' }]);
            comp.factCheckEditFormGroup.controls['claims'].setValue([{ id: '123' }]);
        }

        describe('Publish', () => {
            it('Should call publish service on publish for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Factcheck('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.factcheck = entity;
                // WHEN
                createFactCheckEditFormGroup();
                comp.saveOrPublish('Publish');
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(comp.factCheckEditFormGroup.value);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Factcheck('9121');
                comp.createFactCheckEditFormGroup();
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.factcheck = entity;
                // WHEN
                createFactCheckEditFormGroup();
                comp.saveOrPublish('Draft');
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(comp.factCheckEditFormGroup.value);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Factcheck();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.factcheck = entity;
                comp.createFactCheckEditFormGroup();
                // WHEN
                createFactCheckEditFormGroup();
                comp.saveOrPublish('Draft');
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(comp.factCheckEditFormGroup.value);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
