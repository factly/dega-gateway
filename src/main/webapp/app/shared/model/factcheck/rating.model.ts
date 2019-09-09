import { Moment } from 'moment';
import { IClaim } from 'app/shared/model/factcheck/claim.model';
import { IMedia } from 'app/shared/model/core/media.model';

export interface IRating {
    id?: string;
    name?: string;
    numericValue?: number;
    iconURL?: string;
    isDefault?: boolean;
    clientId?: string;
    slug?: string;
    createdDate?: Moment;
    lastUpdatedDate?: Moment;
    description?: string;
    claims?: IClaim[];
    media?: IMedia;
}

export class Rating implements IRating {
    constructor(
        public id?: string,
        public name?: string,
        public numericValue?: number,
        public iconURL?: string,
        public isDefault?: boolean,
        public clientId?: string,
        public slug?: string,
        public createdDate?: Moment,
        public lastUpdatedDate?: Moment,
        public description?: string,
        public claims?: IClaim[],
        public media?: IMedia
    ) {
        this.isDefault = this.isDefault || false;
    }
}
