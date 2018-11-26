import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRole } from 'app/shared/model/core/role.model';

type EntityResponseType = HttpResponse<IRole>;
type EntityArrayResponseType = HttpResponse<IRole[]>;

@Injectable({ providedIn: 'root' })
export class RoleService {
    public resourceUrl = SERVER_API_URL + 'core/api/roles';
    public resourceSearchUrl = SERVER_API_URL + 'core/api/_search/roles';

    constructor(private http: HttpClient) {}

    create(role: IRole): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(role);
        return this.http
            .post<IRole>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(role: IRole): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(role);
        return this.http
            .put<IRole>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IRole>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRole[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRole[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(role: IRole): IRole {
        const copy: IRole = Object.assign({}, role, {
            createdDate: role.createdDate != null && role.createdDate.isValid() ? role.createdDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((role: IRole) => {
                role.createdDate = role.createdDate != null ? moment(role.createdDate) : null;
            });
        }
        return res;
    }
}
