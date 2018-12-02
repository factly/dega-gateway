import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFormat } from 'app/shared/model/core/format.model';

type EntityResponseType = HttpResponse<IFormat>;
type EntityArrayResponseType = HttpResponse<IFormat[]>;

@Injectable({ providedIn: 'root' })
export class FormatService {
    public resourceUrl = SERVER_API_URL + 'core/api/formats';
    public resourceSearchUrl = SERVER_API_URL + 'core/api/_search/formats';
    public resourceUrlForFormatBySlug = SERVER_API_URL + 'core/api/formatbyslug';

    constructor(private http: HttpClient) {}

    create(format: IFormat): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(format);
        return this.http
            .post<IFormat>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(format: IFormat): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(format);
        return this.http
            .put<IFormat>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IFormat>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFormat[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFormat[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(format: IFormat): IFormat {
        const copy: IFormat = Object.assign({}, format, {
            createdDate: format.createdDate != null && format.createdDate.isValid() ? format.createdDate.toJSON() : null,
            lastUpdatedDate: format.lastUpdatedDate != null && format.lastUpdatedDate.isValid() ? format.lastUpdatedDate.toJSON() : null
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
            res.body.forEach((format: IFormat) => {
                format.createdDate = format.createdDate != null ? moment(format.createdDate) : null;
                format.lastUpdatedDate = format.lastUpdatedDate != null ? moment(format.lastUpdatedDate) : null;
            });
        }
        return res;
    }

    getFormatBySlug(slug: string): Observable<EntityResponseType> {
        return this.http.get<IFormat>(`${this.resourceUrlForFormatBySlug}/${slug}`, { observe: 'response' });
    }
}
