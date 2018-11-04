import { Moment } from 'moment';
import { ITag } from 'app/shared/model/core/tag.model';
import { ICategory } from 'app/shared/model/core/category.model';

export interface IPost {
    id?: string;
    title?: string;
    clientId?: string;
    content?: string;
    excerpt?: string;
    publishedDate?: Moment;
    publishedDateGMT?: Moment;
    lastUpdatedDate?: Moment;
    lastUpdatedDateGMT?: Moment;
    featured?: boolean;
    sticky?: boolean;
    updates?: string;
    slug?: string;
    password?: string;
    featuredMedia?: string;
    subTitle?: string;
    tags?: ITag[];
    categories?: ICategory[];
    statusName?: string;
    statusId?: string;
    formatName?: string;
    formatId?: string;
}

export class Post implements IPost {
    constructor(
        public id?: string,
        public title?: string,
        public clientId?: string,
        public content?: string,
        public excerpt?: string,
        public publishedDate?: Moment,
        public publishedDateGMT?: Moment,
        public lastUpdatedDate?: Moment,
        public lastUpdatedDateGMT?: Moment,
        public featured?: boolean,
        public sticky?: boolean,
        public updates?: string,
        public slug?: string,
        public password?: string,
        public featuredMedia?: string,
        public subTitle?: string,
        public tags?: ITag[],
        public categories?: ICategory[],
        public statusName?: string,
        public statusId?: string,
        public formatName?: string,
        public formatId?: string
    ) {
        this.featured = this.featured || false;
        this.sticky = this.sticky || false;
    }
}
