import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedia } from 'app/shared/model/core/media.model';
import { MediaService } from './media.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-media-upload-dialog',
    templateUrl: './media-upload-dialog.component.html'
})
export class MediaUploadDialogComponent {
    media: IMedia;
    selectedFile: File = null;

    constructor(
        private mediaService: MediaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private router: Router
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    uploadImage() {
        this.mediaService.uploadImage(this.selectedFile).subscribe((res: HttpResponse<IMedia>) => {
            const url = '/media/' + res.body.id + '/edit';
            this.activeModal.close();
            setTimeout(() => {
                this.router.navigate([url]);
            }, 500);
        });
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
    }
}

@Component({
    selector: 'jhi-media-upload-popup',
    template: ''
})
export class MediaUploadPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ media }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MediaUploadDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.media = media;
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
