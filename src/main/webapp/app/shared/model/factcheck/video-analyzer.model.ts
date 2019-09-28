import { Moment } from 'moment';

export interface IVideoAnalyzer {
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
}

export class VideoAnalyzer implements IVideoAnalyzer {
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
        public description?: string
    ) {
        this.isDefault = this.isDefault || false;
    }
}
