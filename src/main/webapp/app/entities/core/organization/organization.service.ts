import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrganization } from 'app/shared/model/core/organization.model';

type EntityResponseType = HttpResponse<IOrganization>;
type EntityArrayResponseType = HttpResponse<IOrganization[]>;

@Injectable({ providedIn: 'root' })
export class OrganizationService {
    public resourceUrl = SERVER_API_URL + 'core/api/organizations';
    public resourceSearchUrl = SERVER_API_URL + 'core/api/_search/organizations';
    public resourceUrlForOrganizationBySlug = SERVER_API_URL + 'core/api/organizationbyslug';

    constructor(private http: HttpClient) {}

    create(organization: IOrganization): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(organization);
        return this.http
            .post<IOrganization>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(organization: IOrganization): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(organization);
        return this.http
            .put<IOrganization>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IOrganization>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrganization[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrganization[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(organization: IOrganization): IOrganization {
        const copy: IOrganization = Object.assign({}, organization, {
            createdDate: organization.createdDate != null && organization.createdDate.isValid() ? organization.createdDate.toJSON() : null,
            lastUpdatedDate:
                organization.lastUpdatedDate != null && organization.lastUpdatedDate.isValid()
                    ? organization.lastUpdatedDate.toJSON()
                    : null
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
            res.body.forEach((organization: IOrganization) => {
                organization.createdDate = organization.createdDate != null ? moment(organization.createdDate) : null;
                organization.lastUpdatedDate = organization.lastUpdatedDate != null ? moment(organization.lastUpdatedDate) : null;
            });
        }
        return res;
    }

    getOrganizationBySlug(slug: string): Observable<EntityResponseType> {
        return this.http.get<IOrganization>(`${this.resourceUrlForOrganizationBySlug}/${slug}`, { observe: 'response' });
    }

    getOrganizationsByKeycloakId(clientId: string): Observable<EntityArrayResponseType> {
        return this.http.get<IOrganization[]>(`${this.resourceUrl}?keycloakUserId=${clientId}`, { observe: 'response' });
    }
}
