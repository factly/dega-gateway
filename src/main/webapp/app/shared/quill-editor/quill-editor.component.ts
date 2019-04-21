import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatDialog } from '@angular/material';

import { QuillEditorFileUploadComponent } from 'app/shared/quill-editor/quill-editor-file-upload.component';

@Component({
    selector: 'jhi-quill-editor',
    templateUrl: './quill-editor.component.html'
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

    constructor(private dialog: MatDialog) {}

    emitEventOnTextChange({ quill, html, text }) {
        const data = {};
        data['html'] = html;
        data['plain_text'] = text;
        this.updated_content.emit(data);
    }

    getEditorInstance(editorInstance: any) {
        this.quillEditorRef = editorInstance;
        const toolbar = editorInstance.getModule('toolbar');
        toolbar.addHandler('image', this.openFileUploadDialog.bind(this));

        // Updates the existing editor with the data passed from the parent component
        this.quillEditorRef.clipboard.dangerouslyPasteHTML(0, this.original_content);
    }
    openFileUploadDialog(): void {
        this.cursorPosition = this.quillEditorRef.getSelection();
        const config = {
            height: '90%',
            width: '90vw',
            maxWidth: '90vw',
            data: { url: 'https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_1280.jpg' }
        };
        const dialogRef = this.dialog.open(QuillEditorFileUploadComponent, config);

        dialogRef.afterClosed().subscribe(image_data => {
            this.updateMediaForQuill(image_data['url']);
        });
    }

    updateMediaForQuill(url) {
        const img = '<img src="' + url + '" />';
        this.quillEditorRef.clipboard.dangerouslyPasteHTML(this.cursorPosition.index, img);
    }
}
