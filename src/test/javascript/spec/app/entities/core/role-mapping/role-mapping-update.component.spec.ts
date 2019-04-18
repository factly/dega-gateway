/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RoleMappingUpdateComponent } from 'app/entities/core/role-mapping/role-mapping-update.component';
import { RoleMappingService } from 'app/entities/core/role-mapping/role-mapping.service';
import { RoleMapping } from 'app/shared/model/core/role-mapping.model';

describe('Component Tests', () => {
    describe('RoleMapping Management Update Component', () => {
        let comp: RoleMappingUpdateComponent;
        let fixture: ComponentFixture<RoleMappingUpdateComponent>;
        let service: RoleMappingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [RoleMappingUpdateComponent]
            })
                .overrideTemplate(RoleMappingUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RoleMappingUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleMappingService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new RoleMapping('123');
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.roleMapping = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new RoleMapping();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.roleMapping = entity;
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
