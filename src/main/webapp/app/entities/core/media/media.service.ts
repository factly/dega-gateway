import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMedia } from 'app/shared/model/core/media.model';

import { Subject } from 'rxjs';

type EntityResponseType = HttpResponse<IMedia>;
type EntityArrayResponseType = HttpResponse<IMedia[]>;

@Injectable({ providedIn: 'root' })
export class MediaService {
    public resourceUrl = SERVER_API_URL + 'core/api/media';
    public resourceSearchUrl = SERVER_API_URL + 'core/api/_search/media';
    public resourceUrlForMediaBySlug = SERVER_API_URL + 'core/api/mediabyslug';
    public uploadImageUrl = SERVER_API_URL + 'core/api/media/upload';
    private imageSrcUrl: string;

    private subject = new Subject<any>();
    constructor(private http: HttpClient) {}

    create(media: IMedia): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(media);
        return this.http
            .post<IMedia>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(media: IMedia): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(media);
        return this.http
            .put<IMedia>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IMedia>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMedia[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMedia[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(media: IMedia): IMedia {
        const copy: IMedia = Object.assign({}, media, {
            publishedDate: media.publishedDate != null && media.publishedDate.isValid() ? media.publishedDate.toJSON() : null,
            lastUpdatedDate: media.lastUpdatedDate != null && media.lastUpdatedDate.isValid() ? media.lastUpdatedDate.toJSON() : null,
            createdDate: media.createdDate != null && media.createdDate.isValid() ? media.createdDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.publishedDate = res.body.publishedDate != null ? moment(res.body.publishedDate) : null;
            res.body.lastUpdatedDate = res.body.lastUpdatedDate != null ? moment(res.body.lastUpdatedDate) : null;
            res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((media: IMedia) => {
                media.publishedDate = media.publishedDate != null ? moment(media.publishedDate) : null;
                media.lastUpdatedDate = media.lastUpdatedDate != null ? moment(media.lastUpdatedDate) : null;
                media.createdDate = media.createdDate != null ? moment(media.createdDate) : null;
            });
        }
        return res;
    }

    getMediaBySlug(slug: string): Observable<EntityResponseType> {
        return this.http.get<IMedia>(`${this.resourceUrlForMediaBySlug}/${slug}`, { observe: 'response' });
    }

    uploadImage(selectedFile: File): Observable<EntityResponseType> {
        const formData = new FormData();
        formData.append('file', selectedFile);
        return this.http.post<IMedia>(this.uploadImageUrl, formData, { observe: 'response' });
    }

    setImageSrcUrl(imageUrl: string) {
        this.imageSrcUrl = imageUrl;
    }

    getImageSrcUrl() {
        return this.imageSrcUrl;
    }

    emptyImageSrcUrl() {
        this.imageSrcUrl = null;
    }

    sendProductId(url: string, event_type: string) {
        this.subject.next({ selected_url: url, type_of_data: event_type });
    }

    getProductID(): Observable<any> {
        return this.subject.asObservable();
    }
}
