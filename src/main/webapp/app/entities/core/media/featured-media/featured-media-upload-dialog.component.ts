import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IMedia } from 'app/shared/model/core/media.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { MediaService } from '../media.service';

@Component({
    selector: 'jhi-featured-media-upload-dialog',
    templateUrl: './featured-media-upload-dialog.component.html'
})
export class FeaturedMediaUploadDialogComponent implements OnInit {
    media: IMedia[];
    private ngbModalRef: NgbModalRef;
    predicate: any;
    reverse: any;
    links: any;
    routeData: any;
    itemsPerPage: any;
    page: any;
    currentSearch: string;
    url_query_type: string;
    @Output()
    messageEvent = new EventEmitter<String>();

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private mediaService: MediaService,
        private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
        public activeModal: NgbActiveModal
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {});
        this.activatedRoute.queryParams.subscribe(params => {
            this.url_query_type = params['media_type'];
        });
    }

    ngOnInit() {
        this.currentSearch = '';
        this.loadAll();
    }

    public _onChange(files: FileList): void {
        /*---if (files && files.length > 0) {
          const file: File = files.item(0);
          const extension = ['image/jpg', 'image/jpeg', 'image/png'];
          if (extension.indexOf(file.type) > -1) {
            const reader = new FileReader();

            reader.onload = ((e) => {
              this.url = e.target['result'];
              const formData = new FormData();
              formData.append('upload', files[0]);
              this.contentSubmitApiService.postUserCoverImageContent(formData).subscribe(content => {
                const x = content;
                this.url = this.asset_url + x;
              });
            });
            reader.readAsDataURL(file);
          } else {
            alert('File not Supported');
          }
        }---*/
        console.log(files);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    uploadImage(url) {
        this.mediaService.setImageSrcUrl(url);
        this.activeModal.close();
    }

    loadAll() {
        this.mediaService
            .query({
                size: 100,
                sort: ['createdDate,desc']
            })
            .subscribe(
                (res: HttpResponse<IMedia[]>) => this.paginateMedia(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'created_date') {
            result.push('created_date');
        }
        return result;
    }

    private paginateMedia(data: IMedia[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.media = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackId(index: number, item: IMedia) {
        return item.id;
    }

    clearSearch() {
        this.currentSearch = '';
        this.loadAll();
    }
    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.mediaService
            .search({
                query: this.currentSearch,
                page: this.page - 1,
                size: -1
            })
            .subscribe(
                (res: HttpResponse<IMedia[]>) => this.paginateMedia(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    onSearch(url) {
        this.mediaService.sendProductId(url, this.url_query_type);
        this.activeModal.close();
    }
}

@Component({
    selector: 'jhi-featured-media-upload-popup',
    template: ''
})
export class FeaturedMediaUploadPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.ngbModalRef = this.modalService.open(FeaturedMediaUploadDialogComponent as Component, { size: 'lg', backdrop: 'static' });
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
    }
    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
