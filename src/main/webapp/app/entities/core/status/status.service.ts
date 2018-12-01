import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStatus } from 'app/shared/model/core/status.model';

type EntityResponseType = HttpResponse<IStatus>;
type EntityArrayResponseType = HttpResponse<IStatus[]>;

@Injectable({ providedIn: 'root' })
export class StatusService {
    public resourceUrl = SERVER_API_URL + 'core/api/statuses';
    public resourceSearchUrl = SERVER_API_URL + 'core/api/_search/statuses';

    constructor(private http: HttpClient) {}

    create(status: IStatus): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(status);
        return this.http
            .post<IStatus>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(status: IStatus): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(status);
        return this.http
            .put<IStatus>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStatus[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(status: IStatus): IStatus {
        const copy: IStatus = Object.assign({}, status, {
            createdDate: status.createdDate != null && status.createdDate.isValid() ? status.createdDate.toJSON() : null,
            lastUpdatedDate: status.lastUpdatedDate != null && status.lastUpdatedDate.isValid() ? status.lastUpdatedDate.toJSON() : null
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
            res.body.forEach((status: IStatus) => {
                status.createdDate = status.createdDate != null ? moment(status.createdDate) : null;
                status.lastUpdatedDate = status.lastUpdatedDate != null ? moment(status.lastUpdatedDate) : null;
            });
        }
        return res;
    }
}
