import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFactCheck } from 'app/shared/model/factcheck/fact-check.model';

type EntityResponseType = HttpResponse<IFactCheck>;
type EntityArrayResponseType = HttpResponse<IFactCheck[]>;

@Injectable({ providedIn: 'root' })
export class FactCheckService {
    public resourceUrl = SERVER_API_URL + 'factcheck/api/fact-checks';
    public resourceSearchUrl = SERVER_API_URL + 'factcheck/api/_search/fact-checks';

    constructor(private http: HttpClient) {}

    create(factCheck: IFactCheck): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(factCheck);
        return this.http
            .post<IFactCheck>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(factCheck: IFactCheck): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(factCheck);
        return this.http
            .put<IFactCheck>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IFactCheck>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFactCheck[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFactCheck[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(factCheck: IFactCheck): IFactCheck {
        const copy: IFactCheck = Object.assign({}, factCheck, {
            publishedDate: factCheck.publishedDate != null && factCheck.publishedDate.isValid() ? factCheck.publishedDate.toJSON() : null,
            publishedDateGMT:
                factCheck.publishedDateGMT != null && factCheck.publishedDateGMT.isValid() ? factCheck.publishedDateGMT.toJSON() : null,
            lastUpdatedDate:
                factCheck.lastUpdatedDate != null && factCheck.lastUpdatedDate.isValid() ? factCheck.lastUpdatedDate.toJSON() : null,
            lastUpdatedDateGMT:
                factCheck.lastUpdatedDateGMT != null && factCheck.lastUpdatedDateGMT.isValid()
                    ? factCheck.lastUpdatedDateGMT.toJSON()
                    : null
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
            res.body.forEach((factCheck: IFactCheck) => {
                factCheck.publishedDate = factCheck.publishedDate != null ? moment(factCheck.publishedDate) : null;
                factCheck.publishedDateGMT = factCheck.publishedDateGMT != null ? moment(factCheck.publishedDateGMT) : null;
                factCheck.lastUpdatedDate = factCheck.lastUpdatedDate != null ? moment(factCheck.lastUpdatedDate) : null;
                factCheck.lastUpdatedDateGMT = factCheck.lastUpdatedDateGMT != null ? moment(factCheck.lastUpdatedDateGMT) : null;
            });
        }
        return res;
    }
}
