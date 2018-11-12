/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { FactCheckUpdateComponent } from 'app/entities/factcheck/fact-check/fact-check-update.component';
import { FactCheckService } from 'app/entities/factcheck/fact-check/fact-check.service';
import { FactCheck } from 'app/shared/model/factcheck/fact-check.model';

describe('Component Tests', () => {
    describe('FactCheck Management Update Component', () => {
        let comp: FactCheckUpdateComponent;
        let fixture: ComponentFixture<FactCheckUpdateComponent>;
        let service: FactCheckService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FactCheckUpdateComponent]
            })
                .overrideTemplate(FactCheckUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FactCheckUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FactCheckService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new FactCheck('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.factCheck = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new FactCheck();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.factCheck = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
