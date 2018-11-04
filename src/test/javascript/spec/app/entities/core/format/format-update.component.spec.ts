/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { FormatUpdateComponent } from 'app/entities/core/format/format-update.component';
import { FormatService } from 'app/entities/core/format/format.service';
import { Format } from 'app/shared/model/core/format.model';

describe('Component Tests', () => {
    describe('Format Management Update Component', () => {
        let comp: FormatUpdateComponent;
        let fixture: ComponentFixture<FormatUpdateComponent>;
        let service: FormatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FormatUpdateComponent]
            })
                .overrideTemplate(FormatUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FormatUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormatService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Format('123');
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.format = entity;
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
                    const entity = new Format();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.format = entity;
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
