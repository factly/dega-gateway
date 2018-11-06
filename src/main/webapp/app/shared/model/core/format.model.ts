import { IPost } from 'app/shared/model/core/post.model';

export interface IFormat {
    id?: string;
    name?: string;
    isDefault?: boolean;
    clientId?: string;
    description?: string;
    posts?: IPost[];
}

export class Format implements IFormat {
    constructor(
        public id?: string,
        public name?: string,
        public isDefault?: boolean,
        public clientId?: string,
        public description?: string,
        public posts?: IPost[]
    ) {
        this.isDefault = this.isDefault || false;
    }
}
