import { Moment } from 'moment';

export interface IMedia {
    id?: string;
    name?: string;
    type?: string;
    url?: string;
    fileSize?: string;
    dimensions?: string;
    title?: string;
    caption?: string;
    altText?: string;
    description?: string;
    uploadedBy?: string;
    publishedDate?: Moment;
    publishedDateGMT?: Moment;
    lastUpdatedDate?: Moment;
    lastUpdatedDateGMT?: Moment;
    slug?: string;
}

export class Media implements IMedia {
    constructor(
        public id?: string,
        public name?: string,
        public type?: string,
        public url?: string,
        public fileSize?: string,
        public dimensions?: string,
        public title?: string,
        public caption?: string,
        public altText?: string,
        public description?: string,
        public uploadedBy?: string,
        public publishedDate?: Moment,
        public publishedDateGMT?: Moment,
        public lastUpdatedDate?: Moment,
        public lastUpdatedDateGMT?: Moment,
        public slug?: string
    ) {}
}
