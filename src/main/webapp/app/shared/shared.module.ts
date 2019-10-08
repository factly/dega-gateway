import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill-v2';

import { QuillEditorAddTweetComponent } from 'app/shared/quill-editor/quill-editor-add-tweet.component';
import { QuillEditorComponent } from 'app/shared/quill-editor/quill-editor.component';
import { QuillEditorFileUploadComponent } from 'app/shared/quill-editor/quill-editor-file-upload.component';
import { MultipleCheckboxComponent } from 'app/shared/multiple-checkbox/multiple-checkbox.component';
import { NgbDateMomentAdapter } from 'app/shared/util/datepicker-adapter';
import { GatewaySharedCommonModule, GatewaySharedLibsModule, HasAnyAuthorityDirective } from 'app/shared/index';
import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';
import { FileSizePipe } from 'app/shared/filesize/filesize.pipe';

import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        GatewaySharedLibsModule,
        GatewaySharedCommonModule,
        MatCheckboxModule,
        MatButtonModule,
        MatDialogModule,
        MatChipsModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
        QuillModule
    ],
    declarations: [
        ConfirmationDialogComponent,
        HasAnyAuthorityDirective,
        MultipleCheckboxComponent,
        QuillEditorAddTweetComponent,
        QuillEditorComponent,
        QuillEditorFileUploadComponent,
        FileSizePipe
    ],
    providers: [
        {
            provide: NgbDateAdapter,
            useClass: NgbDateMomentAdapter
        }
    ],
    entryComponents: [QuillEditorAddTweetComponent, QuillEditorFileUploadComponent],
    exports: [
        ConfirmationDialogComponent,
        GatewaySharedCommonModule,
        HasAnyAuthorityDirective,
        MultipleCheckboxComponent,
        QuillEditorComponent,
        FileSizePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySharedModule {}
