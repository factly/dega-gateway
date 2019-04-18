import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRoleMapping } from 'app/shared/model/core/role-mapping.model';
import { RoleMappingService } from './role-mapping.service';

@Component({
    selector: 'jhi-role-mapping-delete-dialog',
    templateUrl: './role-mapping-delete-dialog.component.html'
})
export class RoleMappingDeleteDialogComponent {
    roleMapping: IRoleMapping;

    constructor(
        private roleMappingService: RoleMappingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.roleMappingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'roleMappingListModification',
                content: 'Deleted an roleMapping'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-role-mapping-delete-popup',
    template: ''
})
export class RoleMappingDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ roleMapping }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RoleMappingDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.roleMapping = roleMapping;
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
