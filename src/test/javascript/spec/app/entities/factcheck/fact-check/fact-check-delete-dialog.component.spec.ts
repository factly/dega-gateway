/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { FactCheckDeleteDialogComponent } from 'app/entities/factcheck/fact-check/fact-check-delete-dialog.component';
import { FactCheckService } from 'app/entities/factcheck/fact-check/fact-check.service';

describe('Component Tests', () => {
    describe('FactCheck Management Delete Component', () => {
        let comp: FactCheckDeleteDialogComponent;
        let fixture: ComponentFixture<FactCheckDeleteDialogComponent>;
        let service: FactCheckService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FactCheckDeleteDialogComponent]
            })
                .overrideTemplate(FactCheckDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FactCheckDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FactCheckService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete('123');
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith('123');
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
