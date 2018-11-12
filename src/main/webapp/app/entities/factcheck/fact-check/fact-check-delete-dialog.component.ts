import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFactCheck } from 'app/shared/model/factcheck/fact-check.model';
import { FactCheckService } from './fact-check.service';

@Component({
    selector: 'jhi-fact-check-delete-dialog',
    templateUrl: './fact-check-delete-dialog.component.html'
})
export class FactCheckDeleteDialogComponent {
    factCheck: IFactCheck;

    constructor(private factCheckService: FactCheckService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.factCheckService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'factCheckListModification',
                content: 'Deleted an factCheck'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fact-check-delete-popup',
    template: ''
})
export class FactCheckDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ factCheck }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FactCheckDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.factCheck = factCheck;
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
