import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';

import { QuillEditorComponent } from 'app/shared/quill-editor/quill-editor.component';
import { QuillEditorFileUploadComponent } from 'app/shared/quill-editor/quill-editor-file-upload.component';
import { MultipleCheckboxComponent } from 'app/shared/multiple-checkbox/multiple-checkbox.component';
import { NgbDateMomentAdapter } from 'app/shared/util/datepicker-adapter';
import { GatewaySharedCommonModule, GatewaySharedLibsModule, HasAnyAuthorityDirective } from 'app/shared/index';
import { QuillEditorCustomOptionsComponent } from 'app/shared/quill-editor/quill-editor-custom-options.component';

@NgModule({
    imports: [GatewaySharedLibsModule, GatewaySharedCommonModule, MatCheckboxModule, MatDialogModule, QuillModule],
    declarations: [
        HasAnyAuthorityDirective,
        MultipleCheckboxComponent,
        QuillEditorComponent,
        QuillEditorFileUploadComponent,
        QuillEditorCustomOptionsComponent
    ],
    providers: [
        {
            provide: NgbDateAdapter,
            useClass: NgbDateMomentAdapter
        }
    ],
    exports: [GatewaySharedCommonModule, HasAnyAuthorityDirective, MultipleCheckboxComponent, QuillEditorComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySharedModule {}
