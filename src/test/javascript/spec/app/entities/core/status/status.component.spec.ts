/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { GatewayTestModule } from '../../../../test.module';
import { StatusComponent } from 'app/entities/core/status/status.component';
import { StatusService } from 'app/entities/core/status/status.service';
import { Status } from 'app/shared/model/core/status.model';
import { MatDialog } from '@angular/material';

describe('Component Tests', () => {
    describe('Status Management Component', () => {
        let comp: StatusComponent;
        let fixture: ComponentFixture<StatusComponent>;
        let service: StatusService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [StatusComponent],
                providers: [
                    {
                        provide: ActivatedRoute,
                        useValue: {
                            data: {
                                subscribe: (fn: (value: Data) => void) =>
                                    fn({
                                        pagingParams: {
                                            predicate: 'createdDate',
                                            reverse: false,
                                            page: 0
                                        }
                                    })
                            }
                        }
                    },
                    { provide: MatDialog, useValue: {} }
                ]
            })
                .overrideTemplate(StatusComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StatusService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Status('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.statuses[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });

        it('should load a page', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Status('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.loadPage(1);

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.statuses[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });

        it('should not load a page is the page is the same as the previous page', () => {
            spyOn(service, 'query').and.callThrough();

            // WHEN
            comp.loadPage(0);

            // THEN
            expect(service.query).toHaveBeenCalledTimes(0);
        });

        it('should re-initialize the page', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Status('123')],
                        headers
                    })
                )
            );

            // WHEN
            comp.loadPage(1);
            comp.clear();

            // THEN
            expect(comp.page).toEqual(0);
            expect(service.query).toHaveBeenCalledTimes(2);
            expect(comp.statuses[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });
        it('should calculate the sort attribute for a createdDate', () => {
            // WHEN
            const result = comp.sort();

            // THEN
            expect(result).toEqual(['createdDate,desc']);
        });

        it('should calculate the sort attribute for a non-id attribute', () => {
            // GIVEN
            comp.predicate = 'name';

            // WHEN
            const result = comp.sort();

            // THEN
            expect(result).toEqual(['name,desc', 'createdDate']);
        });
    });
});
