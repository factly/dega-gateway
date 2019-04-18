/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DegaUserUpdateComponent } from 'app/entities/core/dega-user/dega-user-update.component';
import { DegaUserService } from 'app/entities/core/dega-user/dega-user.service';
import { DegaUser } from 'app/shared/model/core/dega-user.model';

describe('Component Tests', () => {
    describe('DegaUser Management Update Component', () => {
        let comp: DegaUserUpdateComponent;
        let fixture: ComponentFixture<DegaUserUpdateComponent>;
        let service: DegaUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DegaUserUpdateComponent]
            })
                .overrideTemplate(DegaUserUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DegaUserUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DegaUserService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new DegaUser('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.degaUser = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new DegaUser();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.degaUser = entity;
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
