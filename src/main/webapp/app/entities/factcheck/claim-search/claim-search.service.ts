import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClaim } from 'app/shared/model/factcheck/claim.model';

type EntityArrayResponseType = HttpResponse<IClaim[]>;

@Injectable({ providedIn: 'root' })
export class ClaimSearchService {
    public resourceSearchUrl = SERVER_API_URL + 'factcheck/api/_search/claims';

    constructor(private http: HttpClient) {}

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClaim[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }
}
