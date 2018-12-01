import { Moment } from 'moment';
import { IPost } from 'app/shared/model/core/post.model';

export interface ITag {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    clientId?: string;
    createdDate?: Moment;
    lastUpdatedDate?: Moment;
    posts?: IPost[];
}

export class Tag implements ITag {
    constructor(
        public id?: string,
        public name?: string,
        public slug?: string,
        public description?: string,
        public clientId?: string,
        public createdDate?: Moment,
        public lastUpdatedDate?: Moment,
        public posts?: IPost[]
    ) {}
}
