import { IPost } from 'app/shared/model/core/post.model';

export interface ICategory {
    id?: string;
    name?: string;
    description?: string;
    slug?: string;
    parent?: string;
    clientId?: string;
    posts?: IPost[];
}

export class Category implements ICategory {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public slug?: string,
        public parent?: string,
        public clientId?: string,
        public posts?: IPost[]
    ) {}
}
