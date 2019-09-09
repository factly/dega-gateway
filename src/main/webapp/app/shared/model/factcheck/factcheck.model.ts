import { Moment } from 'moment';
import { IClaim } from 'app/shared/model/factcheck/claim.model';
import { ITag } from 'app/shared/model/core/tag.model';
import { ICategory } from 'app/shared/model/core/category.model';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { IMedia } from 'app/shared/model/core/media.model';

export interface IFactcheck {
    id?: string;
    title?: string;
    clientId?: string;
    introduction?: string;
    summary?: string;
    excerpt?: string;
    publishedDate?: Moment;
    lastUpdatedDate?: Moment;
    featured?: boolean;
    sticky?: boolean;
    updates?: string;
    slug?: string;
    password?: string;
    media?: IMedia;
    subTitle?: string;
    createdDate?: Moment;
    claims?: IClaim[];
    tags?: ITag[];
    categories?: ICategory[];
    degaUsers?: IDegaUser[];
    statusName?: string;
}

export class Factcheck implements IFactcheck {
    constructor(
        public id?: string,
        public title?: string,
        public clientId?: string,
        public introduction?: string,
        public summary?: string,
        public excerpt?: string,
        public publishedDate?: Moment,
        public lastUpdatedDate?: Moment,
        public featured?: boolean,
        public sticky?: boolean,
        public updates?: string,
        public slug?: string,
        public password?: string,
        public media?: IMedia,
        public subTitle?: string,
        public createdDate?: Moment,
        public claims?: IClaim[],
        public statusName?: string
    ) {
        this.featured = this.featured || false;
        this.sticky = this.sticky || false;
    }
}
