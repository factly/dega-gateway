import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { VIDEO_ANALYZER_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVideoAnalyzer } from 'app/shared/model/factcheck/video-analyzer.model';

type EntityResponseType = HttpResponse<IVideoAnalyzer>;
type EntityArrayResponseType = HttpResponse<IVideoAnalyzer[]>;

@Injectable({ providedIn: 'root' })
export class VideoAnalyzerService {
    public resourceUrlForVideo = VIDEO_ANALYZER_URL + 'videos/';
    public resourceUrlForVideoAnalysis = VIDEO_ANALYZER_URL + 'video_analysis/';

    constructor(private http: HttpClient) {}

    create(videoAnalyzer: IVideoAnalyzer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(videoAnalyzer);
        return this.http
            .post<IVideoAnalyzer>(this.resourceUrlForVideo, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(videoAnalyzer: IVideoAnalyzer): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(videoAnalyzer);
        return this.http
            .put<IVideoAnalyzer>(this.resourceUrlForVideo, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVideoAnalyzer[]>(this.resourceUrlForVideo, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IVideoAnalyzer>(`${this.resourceUrlForVideo}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrlForVideo}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(rating: IVideoAnalyzer): IVideoAnalyzer {
        const copy: IVideoAnalyzer = Object.assign({}, rating, {
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
            res.body.forEach((rating: IVideoAnalyzer) => {
                rating.createdDate = rating.createdDate != null ? moment(rating.createdDate) : null;
                rating.lastUpdatedDate = rating.lastUpdatedDate != null ? moment(rating.lastUpdatedDate) : null;
            });
        }
        return res;
    }
}
