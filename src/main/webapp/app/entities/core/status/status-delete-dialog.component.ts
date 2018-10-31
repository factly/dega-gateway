import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStatus } from 'app/shared/model/core/status.model';
import { StatusService } from './status.service';

@Component({
    selector: 'jhi-status-delete-dialog',
    templateUrl: './status-delete-dialog.component.html'
})
export class StatusDeleteDialogComponent {
    status: IStatus;

    constructor(private statusService: StatusService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.statusService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'statusListModification',
                content: 'Deleted an status'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-status-delete-popup',
    template: ''
})
export class StatusDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ status }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StatusDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.status = status;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
