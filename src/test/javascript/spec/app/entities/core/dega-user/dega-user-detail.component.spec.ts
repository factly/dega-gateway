/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DegaUserDetailComponent } from 'app/entities/core/dega-user/dega-user-detail.component';
import { DegaUser } from 'app/shared/model/core/dega-user.model';

describe('Component Tests', () => {
    describe('DegaUser Management Detail Component', () => {
        let comp: DegaUserDetailComponent;
        let fixture: ComponentFixture<DegaUserDetailComponent>;
        const route = ({ data: of({ degaUser: new DegaUser('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DegaUserDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DegaUserDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DegaUserDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.degaUser).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
