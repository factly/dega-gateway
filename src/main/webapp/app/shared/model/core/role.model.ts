import { Moment } from 'moment';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { IRoleMapping } from 'app/shared/model/core/role-mapping.model';

export interface IRole {
    id?: string;
    name?: string;
    clientId?: string;
    isDefault?: boolean;
    slug?: string;
    createdDate?: Moment;
    lastUpdatedDate?: Moment;
    degaUsers?: IDegaUser[];
    roleMappings?: IRoleMapping[];
}

export class Role implements IRole {
    constructor(
        public id?: string,
        public name?: string,
        public clientId?: string,
        public isDefault?: boolean,
        public slug?: string,
        public createdDate?: Moment,
        public lastUpdatedDate?: Moment,
        public degaUsers?: IDegaUser[],
        public roleMappings?: IRoleMapping[]
    ) {
        this.isDefault = this.isDefault || false;
    }
}
