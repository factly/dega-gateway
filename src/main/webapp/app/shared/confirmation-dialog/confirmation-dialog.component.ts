import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'jhi-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit() {}

    accept() {
        this.dialogRef.close({ accept: true });
    }

    cancel() {
        this.dialogRef.close({ accept: false });
    }
}
