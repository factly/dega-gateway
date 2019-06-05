import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { MatDialog } from '@angular/material';

import { QuillEditorFileUploadComponent } from 'app/shared/quill-editor/quill-editor-file-upload.component';
import * as Quill from 'quill';
const BlockEmbed = Quill.import('blots/block');

export class Video extends BlockEmbed {
    static create(value) {
        let node = super.create(value);
        let iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('src', value);

        iframe.className = 'test-class';
        node.appendChild(iframe);
        console.log('called');
        return node;
    }

    static value(domNode) {
        return domNode.firstChild.getAttribute('src');
    }
}

Video['blotName'] = 'video';
Video['className'] = 'ql-video';
Video['tagName'] = 'div';

Quill.register('formats/video', Video);

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
    tableInstance;
    modules = {
        table: true
    };
    test_content = `<div class="fluid-width-video-wrapper">
   <div class="ql-video">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/QpvEWVVnICE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute; left:0px; top:0px; width:100%; height:100%;"></iframe>
   </div>
</div>`;
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
            height: '90%',
            width: '90vw',
            maxWidth: '90vw'
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

// const QuillBlockEmbed = Quill.import('blots/block/embed');
//
//
// class Video extends QuillBlockEmbed {
//
// }

// Quill.register(Video);
