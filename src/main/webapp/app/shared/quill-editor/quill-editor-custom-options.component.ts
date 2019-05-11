import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IMedia } from 'app/shared/model/core/media.model';
import { MediaService } from 'app/entities/core/media/media.service';

@Component({
    selector: 'jhi-quill-editor-custom-options',
    templateUrl: './quill-editor-custom-options.component.html'
})
export class QuillEditorCustomOptionsComponent implements OnInit {
    media: IMedia[];
    currentSearch: string;
    links: any;
    page: any;
    url: string;

    constructor(public dialogRef: MatDialogRef<QuillEditorCustomOptionsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        console.log(data);
    }

    ngOnInit() {
        this.currentSearch = '';
    }

    selectImage(url): void {
        const data = {};
        data['url'] = url;

        this.dialogRef.close(data);
    }

    clear() {
        this.dialogRef.close();
    }
}
