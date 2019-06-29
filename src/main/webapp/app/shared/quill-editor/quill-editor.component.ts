import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatDialog } from '@angular/material';

import { QuillEditorAddTweetComponent } from 'app/shared/quill-editor/quill-editor-add-tweet.component';
import { QuillEditorFileUploadComponent } from 'app/shared/quill-editor/quill-editor-file-upload.component';

import * as Quill from 'quill';

declare let twttr;

const BlockEmbed = Quill.import('blots/block/embed');

class Video extends BlockEmbed {
    static create(value) {
        const node = super.create(value);
        const iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('src', value);

        iframe.className = 'ql-custom-embedd';
        node.appendChild(iframe);
        return node;
    }

    static value(domNode) {
        return domNode.firstChild.getAttribute('src');
    }
}

class TweetBlot extends BlockEmbed {
    static create(id) {
        const node = super.create();
        node.dataset.id = id;
        // Allow twitter library to modify our contents
        twttr.widgets.createTweet(id, node);
        return node;
    }

    static value(domNode) {
        return domNode.dataset.id;
    }
}

TweetBlot['blotName'] = 'tweet';
TweetBlot['tagName'] = 'div';
TweetBlot['className'] = 'tweet';

Video['blotName'] = 'video';
Video['className'] = 'custom-parent-container-for-embedded-data';
Video['tagName'] = 'div';

Quill.register('formats/video', Video);
Quill.register('formats/twitter', TweetBlot);

@Component({
    selector: 'jhi-quill-editor',
    templateUrl: './quill-editor.component.html',
    styleUrls: ['quill-editor.component.scss']
})
export class QuillEditorComponent {
    quillEditorRef: any;
    cursorPosition: any;

    @Input()
    original_content: string;
    @Input()
    original_content_1: string;
    @Output()
    updated_content: EventEmitter<any> = new EventEmitter();
    tableInstance;
    modules = {
        table: true
    };
    constructor(private dialog: MatDialog) {}

    emitEventOnTextChange({ quill, html, text }) {
        const data = {};
        data['html'] = html;
        data['plain_text'] = text;
        this.updated_content.emit(data);
    }

    getEditorInstance(editorInstance: any) {
        this.quillEditorRef = editorInstance;
        // editorInstance.register(Video)
        const toolbar = editorInstance.getModule('toolbar');
        this.tableInstance = editorInstance.getModule('table');
        toolbar.addHandler('image', this.openFileUploadDialog.bind(this));

        // Updates the existing editor with the data passed from the parent component
        this.quillEditorRef.clipboard.dangerouslyPasteHTML(0, this.original_content);
    }

    openFileUploadDialog(): void {
        this.cursorPosition = this.quillEditorRef.getSelection();
        const config = {
            height: '80%',
            width: '80vw',
            maxWidth: '80vw',
            panelClass: ['header-dialogue']
        };
        const dialogRef = this.dialog.open(QuillEditorFileUploadComponent, config);

        dialogRef.afterClosed().subscribe(image_data => {
            this.updateMediaForQuill(image_data['url']);
        });
    }

    add_tweet() {
        this.cursorPosition = this.quillEditorRef.getSelection();
        const dialogRef = this.dialog.open(QuillEditorAddTweetComponent);
        dialogRef.afterClosed().subscribe(tweet_id => {
            this.quillEditorRef.insertEmbed(this.cursorPosition.index, 'tweet', tweet_id);
        });
    }

    updateMediaForQuill(url) {
        const img = '<img src="' + url + '" />';
        this.quillEditorRef.clipboard.dangerouslyPasteHTML(this.cursorPosition.index, img);
    }

    rowAbove() {
        this.tableInstance.insertRowAbove();
    }

    rowBelow() {
        this.tableInstance.insertRowBelow();
    }

    colLeft() {
        this.tableInstance.insertColumnLeft();
    }

    colRight() {
        this.tableInstance.insertColumnRight();
    }

    rowDelete() {
        this.tableInstance.deleteRow();
    }

    colDelete() {
        this.tableInstance.deleteColumn();
    }

    tableDelete() {
        this.tableInstance.deleteTable();
    }
}
