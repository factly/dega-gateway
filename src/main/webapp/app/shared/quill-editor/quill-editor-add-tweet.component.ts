import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IMedia } from 'app/shared/model/core/media.model';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'jhi-quill-editor-add-tweet',
    templateUrl: './quill-editor-add-tweet.component.html'
})
export class QuillEditorAddTweetComponent implements OnInit {
    media: IMedia[];
    currentSearch: string;
    links: any;
    page: any;
    url: string;

    constructor(public dialogRef: MatDialogRef<QuillEditorAddTweetComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit() {
        this.currentSearch = '';
    }

    selectImage(url): void {
        const data = {};
        data['tweet_id'] = url;

        this.dialogRef.close(data);
    }

    clear() {
        this.dialogRef.close();
    }
}
