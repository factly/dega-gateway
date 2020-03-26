import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IMedia } from 'app/shared/model/core/media.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { MediaService } from './media.service';

@Component({
    selector: 'jhi-media',
    templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {
    currentAccount: any;
    media: IMedia[] = [];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page = 0;
    predicate: any;
    reverse: any;

    pageSize = 30;
    url: string;
    previousSelectedImage = { selected: null };
    currentSelectedImage: any = {};

    constructor(
        private mediaService: MediaService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    loadAll() {
        this.mediaService
            .query({
                size: this.pageSize,
                sort: ['createdDate,desc']
            })
            .subscribe(
                (res: HttpResponse<IMedia[]>) => this.paginateMedia(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private paginateMedia(data: IMedia[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.media = data;
    }

    imageDetail(imageData): void {
        this.currentSelectedImage = imageData;
        if (imageData.selected != null) {
            imageData.selected = null;
            this.previousSelectedImage.selected = null;
        } else {
            this.previousSelectedImage.selected = null;
            imageData.selected = true;
            this.previousSelectedImage = imageData;
        }
    }

    public uploadImageFromLocalSystem(files: FileList): void {
        if (files && files.length > 0) {
            const file: File = files.item(0);
            const extension = ['image/jpg', 'image/jpeg', 'image/png', 'image/tiff', 'image/ico', 'image/webp', 'image/gif'];
            if (extension.indexOf(file.type) > -1) {
                this.mediaService.uploadImage(file).subscribe(
                    (res: HttpResponse<IMedia>) => {
                        this.loadAll();
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            } else {
                alert('File not Supported');
            }
        }
    }

    clearSearch() {
        this.currentSearch = '';
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return;
        }
        this.page = 0;
        this.currentSearch = query;
        this.mediaService
            .search({
                query: this.currentSearch,
                page: this.page,
                size: this.pageSize
            })
            .subscribe(
                (res: HttpResponse<IMedia[]>) => this.paginateMedia(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    nextPage() {
        this.page += 1;
        if (this.currentSearch) {
            this.mediaService
                .search({
                    query: this.currentSearch,
                    page: this.page,
                    size: this.pageSize
                })
                .subscribe(
                    (res: HttpResponse<IMedia[]>) => this.paginateMedia(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        } else {
            this.mediaService
                .query({
                    size: this.pageSize,
                    page: this.page,
                    sort: ['createdDate,desc']
                })
                .subscribe(
                    (res: HttpResponse<IMedia[]>) => this.paginateMedia(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }

    previousPage() {
        this.page -= 1;
        if (this.currentSearch) {
            this.mediaService
                .search({
                    query: this.currentSearch,
                    page: this.page,
                    size: this.pageSize
                })
                .subscribe(
                    (res: HttpResponse<IMedia[]>) => this.paginateMedia(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        } else {
            this.mediaService
                .query({
                    size: this.pageSize,
                    page: this.page,
                    sort: ['createdDate,desc']
                })
                .subscribe(
                    (res: HttpResponse<IMedia[]>) => this.paginateMedia(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }
}
