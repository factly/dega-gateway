import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { filter, map } from 'rxjs/operators';

import { VIDEO_ANALYZER_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVideo, IVideoAnalysis, Video, VideoAnalysis } from 'app/shared/model/factcheck/video-analyzer.model';

type EntityResponseType = HttpResponse<IVideo>;
type EntityArrayResponseType = HttpResponse<IVideo[]>;

type VideoAnalysisEntityResponseType = HttpResponse<IVideoAnalysis>;
type VideoAnalysisEntityArrayResponseType = HttpResponse<IVideoAnalysis[]>;

@Injectable({ providedIn: 'root' })
export class VideoAnalyzerService {
    public resourceUrlForVideo = VIDEO_ANALYZER_URL + 'videos/';
    public resourceUrlForVideoAnalysis = VIDEO_ANALYZER_URL + 'video_analysis/';

    constructor(private http: HttpClient) {}

    createVideo(videoAnalyzer: IVideo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(videoAnalyzer);
        return this.http
            .post<IVideo>(this.resourceUrlForVideo, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    updateVideo(videoAnalyzer: IVideo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(videoAnalyzer);
        return this.http
            .put<IVideo>(this.resourceUrlForVideo, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findVideo(id: string): Observable<EntityResponseType> {
        return this.http.get<IVideo>(`${this.resourceUrlForVideo}/${id}`, { observe: 'response' });
    }

    deleteVideo(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrlForVideo}/${id}`, { observe: 'response' });
    }

    createVideoAnalysis(videoAnalyzer: IVideo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(videoAnalyzer);
        return this.http
            .post<IVideo>(this.resourceUrlForVideoAnalysis, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    updateVideoAnalysis(id: string, videoAnalyzer: IVideo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(videoAnalyzer);
        return this.http
            .put<IVideo>(`${this.resourceUrlForVideoAnalysis}/${id}`, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findVideoAnalysis(id: string): Observable<VideoAnalysisEntityArrayResponseType> {
        return this.http
            .get<IVideoAnalysis[]>(`${this.resourceUrlForVideoAnalysis}?videoId=${id}`, { observe: 'response' })
            .pipe(map((res: VideoAnalysisEntityArrayResponseType) => this.convertDateArrayVideoAnalysisFromServer(res)));
    }

    deleteVideoAnalysis(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrlForVideoAnalysis}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(rating: IVideo): IVideo {
        const copy: IVideo = Object.assign({}, rating, {
            createdDate: rating.createdDate != null && rating.createdDate.isValid() ? rating.createdDate.toJSON() : null,
            lastUpdatedDate: rating.lastUpdatedDate != null && rating.lastUpdatedDate.isValid() ? rating.lastUpdatedDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
            res.body.lastUpdatedDate = res.body.lastUpdatedDate != null ? moment(res.body.lastUpdatedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((video: IVideo) => {
                video.createdDate = video.createdDate != null ? moment(video.createdDate) : null;
                video.lastUpdatedDate = video.lastUpdatedDate != null ? moment(video.lastUpdatedDate) : null;
            });
        }
        return res;
    }

    protected convertDateArrayVideoAnalysisFromServer(res: VideoAnalysisEntityArrayResponseType): VideoAnalysisEntityArrayResponseType {
        if (res.body) {
            res.body.forEach((video: IVideoAnalysis) => {
                video.createdDate = video.createdDate != null ? moment(video.createdDate) : null;
                video.lastUpdatedDate = video.lastUpdatedDate != null ? moment(video.lastUpdatedDate) : null;
            });
        }
        return res;
    }
}
