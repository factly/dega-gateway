import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { GatewaySharedModule } from 'app/shared';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import {
    VideoAnalyzerComponent,
    VideoAnalyzerDetailComponent,
    videoAnalyzerRoute,
    VideoAnalyzerUpdateComponent
} from 'app/entities/factcheck/video-analyzer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const ENTITY_STATES = [...videoAnalyzerRoute];

@NgModule({
    imports: [
        GatewaySharedModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatDialogModule,
        ReactiveFormsModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [VideoAnalyzerComponent, VideoAnalyzerDetailComponent, VideoAnalyzerUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VideoAnalyzerModule {}
