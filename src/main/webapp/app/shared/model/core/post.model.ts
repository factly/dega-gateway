import { Moment } from 'moment';
import { ITag } from 'app/shared/model/core/tag.model';
import { ICategory } from 'app/shared/model/core/category.model';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';

export interface IPost {
    id?: string;
    title?: string;
    clientId?: string;
    content?: string;
    excerpt?: string;
    publishedDate?: Moment;
    lastUpdatedDate?: Moment;
    featured?: boolean;
    sticky?: boolean;
    updates?: string;
    slug?: string;
    password?: string;
    featuredMedia?: string;
    subTitle?: string;
    createdDate?: Moment;
    tags?: ITag[];
    categories?: ICategory[];
    statusName?: string;
    statusId?: string;
    formatName?: string;
    formatId?: string;
    degaUsers?: IDegaUser[];
}

export class Post implements IPost {
    constructor(
        public id?: string,
        public title?: string,
        public clientId?: string,
        public content?: string,
        public excerpt?: string,
        public publishedDate?: Moment,
        public lastUpdatedDate?: Moment,
        public featured?: boolean,
        public sticky?: boolean,
        public updates?: string,
        public slug?: string,
        public password?: string,
        public featuredMedia?: string,
        public subTitle?: string,
        public createdDate?: Moment,
        public tags?: ITag[],
        public categories?: ICategory[],
        public statusName?: string,
        public statusId?: string,
        public formatName?: string,
        public formatId?: string,
        public degaUsers?: IDegaUser[]
    ) {
        this.featured = this.featured || false;
        this.sticky = this.sticky || false;
    }
}
