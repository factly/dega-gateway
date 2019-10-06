import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITag } from 'app/shared/model/core/tag.model';

type EntityResponseType = HttpResponse<ITag>;
type EntityArrayResponseType = HttpResponse<ITag[]>;

@Injectable({ providedIn: 'root' })
export class TagService {
    public resourceUrl = SERVER_API_URL + 'core/api/tags';
    public resourceSearchUrl = SERVER_API_URL + 'core/api/_search/tags';
    public resourceUrlForTagBySlug = SERVER_API_URL + 'core/api/tagbyslug';

    constructor(private http: HttpClient) {}

    create(tag: ITag): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tag);
        console.log(copy);
        return this.http
            .post<ITag>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(tag: ITag): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tag);
        console.log(copy);
        return this.http
            .put<ITag>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<ITag>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITag[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(tag: ITag): ITag {
        const copy: ITag = Object.assign({}, tag, {
            createdDate: tag.createdDate != null && tag.createdDate.isValid() ? tag.createdDate.toJSON() : null,
            lastUpdatedDate: tag.lastUpdatedDate != null && tag.lastUpdatedDate.isValid() ? tag.lastUpdatedDate.toJSON() : null
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
            res.body.forEach((tag: ITag) => {
                tag.createdDate = tag.createdDate != null ? moment(tag.createdDate) : null;
                tag.lastUpdatedDate = tag.lastUpdatedDate != null ? moment(tag.lastUpdatedDate) : null;
            });
        }
        return res;
    }

    getTagBySlug(slug: string): Observable<EntityResponseType> {
        return this.http.get<ITag>(`${this.resourceUrlForTagBySlug}/${slug}`, { observe: 'response' });
    }
}
