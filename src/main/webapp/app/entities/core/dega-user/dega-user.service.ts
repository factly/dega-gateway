import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';

type EntityResponseType = HttpResponse<IDegaUser>;
type EntityArrayResponseType = HttpResponse<IDegaUser[]>;

@Injectable({ providedIn: 'root' })
export class DegaUserService {
    public resourceUrl = SERVER_API_URL + 'core/api/dega-users';
    public resourceSearchUrl = SERVER_API_URL + 'core/api/_search/dega-users';
    public resourceUrlForDegaUserBySlug = SERVER_API_URL + 'core/api/degauserbyslug';

    constructor(private http: HttpClient) {}

    create(degaUser: IDegaUser): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(degaUser);
        return this.http
            .post<IDegaUser>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(degaUser: IDegaUser): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(degaUser);
        return this.http
            .put<IDegaUser>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IDegaUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDegaUser[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDegaUser[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(degaUser: IDegaUser): IDegaUser {
        const copy: IDegaUser = Object.assign({}, degaUser, {
            createdDate: degaUser.createdDate != null && degaUser.createdDate.isValid() ? degaUser.createdDate.toJSON() : null
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
            res.body.forEach((degaUser: IDegaUser) => {
                degaUser.createdDate = degaUser.createdDate != null ? moment(degaUser.createdDate) : null;
            });
        }
        return res;
    }

    getDegaUserBySlug(slug: string): Observable<EntityResponseType> {
        return this.http.get<IDegaUser>(`${this.resourceUrlForDegaUserBySlug}/${slug}`, { observe: 'response' });
    }
}
