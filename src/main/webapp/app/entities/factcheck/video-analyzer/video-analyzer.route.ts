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

@Injectable({ providedIn: 'root' })
export class RatingResolve implements Resolve<IRating> {
    constructor(private service: VideoAnalyzerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Rating> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Rating>) => response.ok),
                map((rating: HttpResponse<Rating>) => rating.body)
            );
        }
        return of(new Rating());
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
            rating: RatingResolve
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
            rating: RatingResolve
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
            rating: RatingResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN'],
            pageTitle: 'gatewayApp.factcheckRating.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
