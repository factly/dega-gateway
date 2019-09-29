import { Moment } from 'moment';
import { IStatus, Status } from 'app/shared/model/core/status.model';

export interface IVideoAnalyzer {
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

export class VideoAnalyzer implements IVideoAnalyzer {
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
