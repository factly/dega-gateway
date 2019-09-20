import { NgModule } from '@angular/core';
import { GatewaySharedModule } from 'app/shared';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import {
    VideoAnalyzerComponent,
    VideoAnalyzerDetailComponent,
    videoAnalyzerRoute,
    VideoAnalyzerUpdateComponent
} from 'app/entities/factcheck/video-analyzer';

const ENTITY_STATES = [...videoAnalyzerRoute];

@NgModule({
    imports: [
        GatewaySharedModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [VideoAnalyzerComponent, VideoAnalyzerDetailComponent, VideoAnalyzerUpdateComponent]
})
export class VideoAnalyzerModule {}
