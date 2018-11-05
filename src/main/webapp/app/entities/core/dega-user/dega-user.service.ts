import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';

type EntityResponseType = HttpResponse<IDegaUser>;
type EntityArrayResponseType = HttpResponse<IDegaUser[]>;

@Injectable({ providedIn: 'root' })
export class DegaUserService {
    public resourceUrl = SERVER_API_URL + 'core/api/dega-users';
    public resourceSearchUrl = SERVER_API_URL + 'core/api/_search/dega-users';

    constructor(private http: HttpClient) {}

    create(degaUser: IDegaUser): Observable<EntityResponseType> {
        return this.http.post<IDegaUser>(this.resourceUrl, degaUser, { observe: 'response' });
    }

    update(degaUser: IDegaUser): Observable<EntityResponseType> {
        return this.http.put<IDegaUser>(this.resourceUrl, degaUser, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IDegaUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDegaUser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDegaUser[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
