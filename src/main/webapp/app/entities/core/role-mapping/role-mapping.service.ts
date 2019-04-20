import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRoleMapping } from 'app/shared/model/core/role-mapping.model';

type EntityResponseType = HttpResponse<IRoleMapping>;
type EntityArrayResponseType = HttpResponse<IRoleMapping[]>;

@Injectable({ providedIn: 'root' })
export class RoleMappingService {
    public resourceUrl = SERVER_API_URL + 'core/api/role-mappings';
    public resourceSearchUrl = SERVER_API_URL + 'core/api/_search/role-mappings';

    constructor(private http: HttpClient) {}

    create(roleMapping: IRoleMapping): Observable<EntityResponseType> {
        return this.http.post<IRoleMapping>(this.resourceUrl, roleMapping, { observe: 'response' });
    }

    update(roleMapping: IRoleMapping): Observable<EntityResponseType> {
        return this.http.put<IRoleMapping>(this.resourceUrl, roleMapping, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IRoleMapping>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRoleMapping[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRoleMapping[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
