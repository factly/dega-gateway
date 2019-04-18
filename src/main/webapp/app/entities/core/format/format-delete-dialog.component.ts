import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormat } from 'app/shared/model/core/format.model';
import { FormatService } from './format.service';

@Component({
    selector: 'jhi-format-delete-dialog',
    templateUrl: './format-delete-dialog.component.html'
})
export class FormatDeleteDialogComponent {
    format: IFormat;

    constructor(private formatService: FormatService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.formatService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'formatListModification',
                content: 'Deleted an format'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-format-delete-popup',
    template: ''
})
export class FormatDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ format }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FormatDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.format = format;
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
