import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'jhi-quill-editor-add-tweet',
    templateUrl: './quill-editor-add-tweet.component.html'
})
export class QuillEditorAddTweetComponent {
    tweet_link: string;

    constructor(public dialogRef: MatDialogRef<QuillEditorAddTweetComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

    preview(): void {
        (<any>window).twttr.widgets.load();
    }

    selectTweet(): void {
        const data = {};
        data['tweet_id'] = this.tweet_link.split('/')[5];

        this.dialogRef.close(data);
    }

    clear() {
        this.dialogRef.close();
    }
}
