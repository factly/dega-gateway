import { IPost } from 'app/shared/model/core/post.model';

export interface IStatus {
    id?: string;
    name?: string;
    clientId?: string;
    isDefault?: boolean;
    slug?: string;
    posts?: IPost[];
}

export class Status implements IStatus {
    constructor(
        public id?: string,
        public name?: string,
        public clientId?: string,
        public isDefault?: boolean,
        public slug?: string,
        public posts?: IPost[]
    ) {
        this.isDefault = this.isDefault || false;
    }
}
