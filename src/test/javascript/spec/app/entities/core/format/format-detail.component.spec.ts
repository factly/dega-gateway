/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { FormatDetailComponent } from 'app/entities/core/format/format-detail.component';
import { Format } from 'app/shared/model/core/format.model';

describe('Component Tests', () => {
    describe('Format Management Detail Component', () => {
        let comp: FormatDetailComponent;
        let fixture: ComponentFixture<FormatDetailComponent>;
        const route = ({ data: of({ format: new Format('123') }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FormatDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FormatDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FormatDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.format).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});
