import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill-v2';

import { QuillEditorComponent } from 'app/shared/quill-editor/quill-editor.component';
import { QuillEditorFileUploadComponent } from 'app/shared/quill-editor/quill-editor-file-upload.component';
import { MultipleCheckboxComponent } from 'app/shared/multiple-checkbox/multiple-checkbox.component';
import { NgbDateMomentAdapter } from 'app/shared/util/datepicker-adapter';
import { GatewaySharedCommonModule, GatewaySharedLibsModule, HasAnyAuthorityDirective } from 'app/shared/index';
import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        GatewaySharedLibsModule,
        GatewaySharedCommonModule,
        MatCheckboxModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        QuillModule
    ],
    declarations: [
        ConfirmationDialogComponent,
        HasAnyAuthorityDirective,
        MultipleCheckboxComponent,
        QuillEditorComponent,
        QuillEditorFileUploadComponent
    ],
    providers: [
        {
            provide: NgbDateAdapter,
            useClass: NgbDateMomentAdapter
        }
    ],
    exports: [
        ConfirmationDialogComponent,
        GatewaySharedCommonModule,
        HasAnyAuthorityDirective,
        MultipleCheckboxComponent,
        QuillEditorComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySharedModule {}
