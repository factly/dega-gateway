/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { StatusUpdateComponent } from 'app/entities/core/status/status-update.component';
import { StatusService } from 'app/entities/core/status/status.service';
import { Status } from 'app/shared/model/core/status.model';

describe('Component Tests', () => {
    describe('Status Management Update Component', () => {
        let comp: StatusUpdateComponent;
        let fixture: ComponentFixture<StatusUpdateComponent>;
        let service: StatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [StatusUpdateComponent]
            })
                .overrideTemplate(StatusUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StatusUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StatusService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Status('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.status = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Status();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.status = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
