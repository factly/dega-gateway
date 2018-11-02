import { IPost } from 'app/shared/model/core/post.model';

export interface ITag {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    clientId?: string;
    posts?: IPost[];
}

export class Tag implements ITag {
    constructor(
        public id?: string,
        public name?: string,
        public slug?: string,
        public description?: string,
        public clientId?: string,
        public posts?: IPost[]
    ) {}
}
