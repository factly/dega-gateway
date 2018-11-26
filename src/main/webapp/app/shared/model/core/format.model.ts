import { Moment } from 'moment';
import { IPost } from 'app/shared/model/core/post.model';

export interface IFormat {
    id?: string;
    name?: string;
    isDefault?: boolean;
    clientId?: string;
    description?: string;
    slug?: string;
    createdDate?: Moment;
    posts?: IPost[];
}

export class Format implements IFormat {
    constructor(
        public id?: string,
        public name?: string,
        public isDefault?: boolean,
        public clientId?: string,
        public description?: string,
        public slug?: string,
        public createdDate?: Moment,
        public posts?: IPost[]
    ) {
        this.isDefault = this.isDefault || false;
    }
}
