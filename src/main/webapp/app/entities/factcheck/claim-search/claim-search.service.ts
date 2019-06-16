import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClaimSearch } from 'app/shared/model/factcheck/claim-search.model';

type EntityArrayResponseType = HttpResponse<IClaimSearch>;

@Injectable({ providedIn: 'root' })
export class ClaimSearchService {
    public resourceSearchUrl = SERVER_API_URL + 'factcheck/api/claimsearch';

    constructor(private http: HttpClient) {}

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClaimSearch>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
