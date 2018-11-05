/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { DegaUserDeleteDialogComponent } from 'app/entities/core/dega-user/dega-user-delete-dialog.component';
import { DegaUserService } from 'app/entities/core/dega-user/dega-user.service';

describe('Component Tests', () => {
    describe('DegaUser Management Delete Component', () => {
        let comp: DegaUserDeleteDialogComponent;
        let fixture: ComponentFixture<DegaUserDeleteDialogComponent>;
        let service: DegaUserService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DegaUserDeleteDialogComponent]
            })
                .overrideTemplate(DegaUserDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DegaUserDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DegaUserService);
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
