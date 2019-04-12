import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'jhi-quill-editor-file-upload',
    templateUrl: 'quill-editor-file-upload.component.html'
})
export class QuillEditorFileUploadComponent {
    constructor(public dialogRef: MatDialogRef<QuillEditorFileUploadComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
