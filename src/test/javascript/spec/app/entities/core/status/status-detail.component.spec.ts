/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { StatusDetailComponent } from 'app/entities/core/status/status-detail.component';
import { Status } from 'app/shared/model/core/status.model';

describe('Component Tests', () => {
    describe('Status Management Detail Component', () => {
        let comp: StatusDetailComponent;
        let fixture: ComponentFixture<StatusDetailComponent>;
        const route = ({ data: of({ status: new Status('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [StatusDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StatusDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StatusDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.status).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
