import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
        return this.http.post<IStatus>(this.resourceUrl, status, { observe: 'response' });
    }

    update(status: IStatus): Observable<EntityResponseType> {
        return this.http.put<IStatus>(this.resourceUrl, status, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
