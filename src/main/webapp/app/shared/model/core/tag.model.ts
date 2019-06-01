import { Moment } from 'moment';

export interface ITag {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    clientId?: string;
    createdDate?: Moment;
    lastUpdatedDate?: Moment;
}

export class Tag implements ITag {
    constructor(
        public id?: string,
        public name?: string,
        public slug?: string,
        public description?: string,
        public clientId?: string,
        public createdDate?: Moment,
        public lastUpdatedDate?: Moment
    ) {}
}
