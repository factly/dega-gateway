import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Rating } from 'app/shared/model/factcheck/rating.model';
import { VideoAnalyzerService } from './video-analyzer.service';
import { VideoAnalyzerComponent } from './video-analyzer.component';
import { VideoAnalyzerDetailComponent } from './video-analyzer-detail.component';
import { VideoAnalyzerUpdateComponent } from './video-analyzer-update.component';
import { IRating } from 'app/shared/model/factcheck/rating.model';
import { IVideo, Video } from 'app/shared/model/factcheck/video-analyzer.model';

@Injectable({ providedIn: 'root' })
export class VideoDataResolve implements Resolve<IVideo> {
    constructor(private service: VideoAnalyzerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Video> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findVideo(id).pipe(
                filter((response: HttpResponse<Video>) => response.ok),
                map((rating: HttpResponse<Video>) => rating.body['data'])
            );
        }
        return of(new Video());
    }
}

export const videoAnalyzerRoute: Routes = [
    {
        path: 'video-analyzer',
        component: VideoAnalyzerComponent,
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            defaultSort: 'createdDate,desc',
            pageTitle: 'gatewayApp.factcheckRating.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'video-analyzer/:id/view',
        component: VideoAnalyzerDetailComponent,
        resolve: {
            videoData: VideoDataResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            pageTitle: 'gatewayApp.factcheckRating.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'video-analyzer/new',
        component: VideoAnalyzerUpdateComponent,
        resolve: {
            videoData: VideoDataResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            pageTitle: 'gatewayApp.factcheckRating.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'video-analyzer/:id/edit',
        component: VideoAnalyzerUpdateComponent,
        resolve: {
            videoData: VideoDataResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            pageTitle: 'gatewayApp.factcheckRating.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
