import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatDialog } from '@angular/material';

import { QuillEditorFileUploadComponent } from 'app/shared/quill-editor/quill-editor-file-upload.component';

@Component({
    selector: 'jhi-quill-editor',
    templateUrl: './quill-editor.component.html'
})
export class QuillEditorComponent {
    quillEditorRef: any;

    @Input()
    original_content: string;
    @Input()
    original_content_1: string;
    @Output()
    updated_content: EventEmitter<any> = new EventEmitter();

    constructor(private dialog: MatDialog) {}

    emitEventOnTextChange({ quill, html, text }) {
        this.updated_content.emit({ html: html, plain_text: text });
    }

    getEditorInstance(editorInstance: any) {
        this.quillEditorRef = editorInstance;
        const toolbar = editorInstance.getModule('toolbar');
        toolbar.addHandler('image', this.openFileUploadDialog.bind(this));

        // Updates the existing editor with the data passed from the parent component
        this.quillEditorRef.clipboard.dangerouslyPasteHTML(0, this.original_content);
    }
    openFileUploadDialog(): void {
        const dialogRef = this.dialog.open(QuillEditorFileUploadComponent, { width: '250px' });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
