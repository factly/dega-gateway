import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'jhi-new-claim-popup',
    templateUrl: 'new-claim-popup.component.html'
})
export class NewClaimPopupComponent {
    constructor(public dialogRef: MatDialogRef<NewClaimPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
