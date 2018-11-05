import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMedia } from 'app/shared/model/core/media.model';

type EntityResponseType = HttpResponse<IMedia>;
type EntityArrayResponseType = HttpResponse<IMedia[]>;

@Injectable({ providedIn: 'root' })
export class MediaService {
    public resourceUrl = SERVER_API_URL + 'core/api/media';
    public resourceSearchUrl = SERVER_API_URL + 'core/api/_search/media';

    constructor(private http: HttpClient) {}

    create(media: IMedia): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(media);
        return this.http
            .post<IMedia>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(media: IMedia): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(media);
        return this.http
            .put<IMedia>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IMedia>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMedia[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMedia[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(media: IMedia): IMedia {
        const copy: IMedia = Object.assign({}, media, {
            publishedDate: media.publishedDate != null && media.publishedDate.isValid() ? media.publishedDate.toJSON() : null,
            publishedDateGMT: media.publishedDateGMT != null && media.publishedDateGMT.isValid() ? media.publishedDateGMT.toJSON() : null,
            lastUpdatedDate: media.lastUpdatedDate != null && media.lastUpdatedDate.isValid() ? media.lastUpdatedDate.toJSON() : null,
            lastUpdatedDateGMT:
                media.lastUpdatedDateGMT != null && media.lastUpdatedDateGMT.isValid() ? media.lastUpdatedDateGMT.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.publishedDate = res.body.publishedDate != null ? moment(res.body.publishedDate) : null;
            res.body.publishedDateGMT = res.body.publishedDateGMT != null ? moment(res.body.publishedDateGMT) : null;
            res.body.lastUpdatedDate = res.body.lastUpdatedDate != null ? moment(res.body.lastUpdatedDate) : null;
            res.body.lastUpdatedDateGMT = res.body.lastUpdatedDateGMT != null ? moment(res.body.lastUpdatedDateGMT) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((media: IMedia) => {
                media.publishedDate = media.publishedDate != null ? moment(media.publishedDate) : null;
                media.publishedDateGMT = media.publishedDateGMT != null ? moment(media.publishedDateGMT) : null;
                media.lastUpdatedDate = media.lastUpdatedDate != null ? moment(media.lastUpdatedDate) : null;
                media.lastUpdatedDateGMT = media.lastUpdatedDateGMT != null ? moment(media.lastUpdatedDateGMT) : null;
            });
        }
        return res;
    }
}
