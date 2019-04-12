import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';

import { QuillEditorComponent } from 'app/shared/quill-editor/quill-editor.component';
import { QuillEditorFileUploadComponent } from 'app/shared/quill-editor/quill-editor-file-upload.component';

import { NgbDateMomentAdapter } from 'app/shared/util/datepicker-adapter';
import { GatewaySharedLibsModule, GatewaySharedCommonModule, HasAnyAuthorityDirective } from 'app/shared/index';

@NgModule({
    imports: [BrowserAnimationsModule, GatewaySharedLibsModule, GatewaySharedCommonModule, MatDialogModule, QuillModule],
    declarations: [HasAnyAuthorityDirective, QuillEditorComponent, QuillEditorFileUploadComponent],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [GatewaySharedCommonModule, HasAnyAuthorityDirective, QuillEditorComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaySharedModule {}
