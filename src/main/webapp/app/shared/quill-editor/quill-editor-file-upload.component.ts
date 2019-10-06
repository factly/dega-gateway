import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IMedia } from 'app/shared/model/core/media.model';
import { MediaService } from 'app/entities/core/media/media.service';

@Component({
    selector: 'jhi-quill-editor-file-upload',
    templateUrl: './quill-editor-file-upload.component.html'
})
export class QuillEditorFileUploadComponent implements OnInit {
    media: IMedia[];
    currentSearch: string;
    links: any;
    page: any;
    url: string;

    constructor(
        public dialogRef: MatDialogRef<QuillEditorFileUploadComponent>,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private mediaService: MediaService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        this.currentSearch = '';
        this.loadAll();
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

    private paginateMedia(data: IMedia[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.media = data;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    selectImage(imageData): void {
        this.dialogRef.close(imageData);
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

    clear() {
        this.dialogRef.close();
    }
}
