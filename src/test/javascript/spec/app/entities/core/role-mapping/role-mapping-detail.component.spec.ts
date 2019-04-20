/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RoleMappingDetailComponent } from 'app/entities/core/role-mapping/role-mapping-detail.component';
import { RoleMapping } from 'app/shared/model/core/role-mapping.model';

describe('Component Tests', () => {
    describe('RoleMapping Management Detail Component', () => {
        let comp: RoleMappingDetailComponent;
        let fixture: ComponentFixture<RoleMappingDetailComponent>;
        const route = ({ data: of({ roleMapping: new RoleMapping('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [RoleMappingDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RoleMappingDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RoleMappingDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.roleMapping).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
