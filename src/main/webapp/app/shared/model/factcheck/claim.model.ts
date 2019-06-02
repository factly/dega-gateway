import { Moment } from 'moment';
import { IFactcheck } from 'app/shared/model/factcheck/factcheck.model';

export interface IClaim {
    id?: string;
    claim?: string;
    description?: string;
    claimDate?: Moment;
    claimSource?: string;
    checkedDate?: Moment;
    reviewSources?: string;
    review?: string;
    reviewTagLine?: string;
    clientId?: string;
    slug?: string;
    createdDate?: Moment;
    lastUpdatedDate?: Moment;
    ratingName?: string;
    ratingId?: string;
    claimantName?: string;
    claimantId?: string;
}

export class Claim implements IClaim {
    constructor(
        public id?: string,
        public claim?: string,
        public description?: string,
        public claimDate?: Moment,
        public claimSource?: string,
        public checkedDate?: Moment,
        public reviewSources?: string,
        public review?: string,
        public reviewTagLine?: string,
        public clientId?: string,
        public slug?: string,
        public createdDate?: Moment,
        public lastUpdatedDate?: Moment,
        public ratingName?: string,
        public ratingId?: string,
        public claimantName?: string,
        public claimantId?: string,
        public factchecks?: IFactcheck[]
    ) {}
}
