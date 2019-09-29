import { Moment } from 'moment';
import { IStatus, Status } from 'app/shared/model/core/status.model';
import { IRating } from 'app/shared/model/factcheck/rating.model';

export interface IVideo {
    id?: string;
    title?: string;
    clientId?: string;
    slug?: string;
    createdDate?: Moment;
    lastUpdatedDate?: Moment;
    description?: string;
    status?: IStatus;
    link?: string;
}

export interface IVideoAnalysis {
    _id?: string;
    shown_title?: string;
    client_id?: string;
    slug?: string;
    createdDate?: Moment;
    lastUpdatedDate?: Moment;
    shown_description?: string;
    reality_title?: string;
    reality_description?: string;
    reality_source?: string;
    link?: string;
    rating?: IRating;
    end_time_in_sec?: number;
}

export class Video implements IVideo {
    constructor(
        public id?: string,
        public clientId?: string,
        public slug?: string,
        public createdDate?: Moment,
        public lastUpdatedDate?: Moment,
        public description?: string,
        public status?: Status,
        public link?: string
    ) {}
}

export class VideoAnalysis implements IVideoAnalysis {
    constructor(
        public _id?: string,
        public clientId?: string,
        public slug?: string,
        public createdDate?: Moment,
        public lastUpdatedDate?: Moment,
        public shown_description?: string,
        public reality_title?: string,
        public reality_description?: string,
        public reality_source?: string,
        public link?: string,
        public rating?: IRating,
        public end_time_in_sec?: number
    ) {}
}
