import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPost } from 'app/shared/model/core/post.model';

type EntityResponseType = HttpResponse<IPost>;
type EntityArrayResponseType = HttpResponse<IPost[]>;

@Injectable({ providedIn: 'root' })
export class PostService {
    private resourceUrl = SERVER_API_URL + 'core/api/posts';
    private resourceSearchUrl = SERVER_API_URL + 'core/api/_search/posts';

    constructor(private http: HttpClient) {}

    create(post: IPost): Observable<EntityResponseType> {
        return this.http.post<IPost>(this.resourceUrl, post, { observe: 'response' });
    }

    update(post: IPost): Observable<EntityResponseType> {
        return this.http.put<IPost>(this.resourceUrl, post, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IPost>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPost[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPost[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
