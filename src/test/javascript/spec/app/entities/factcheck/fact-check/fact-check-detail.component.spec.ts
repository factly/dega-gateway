/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { FactCheckDetailComponent } from 'app/entities/factcheck/fact-check/fact-check-detail.component';
import { FactCheck } from 'app/shared/model/factcheck/fact-check.model';

describe('Component Tests', () => {
    describe('FactCheck Management Detail Component', () => {
        let comp: FactCheckDetailComponent;
        let fixture: ComponentFixture<FactCheckDetailComponent>;
        const route = ({ data: of({ factCheck: new FactCheck('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FactCheckDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FactCheckDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FactCheckDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.factCheck).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
