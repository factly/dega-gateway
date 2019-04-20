import { IDegaUser } from 'app/shared/model/core/dega-user.model';

export interface IRoleMapping {
    id?: string;
    name?: string;
    organizationName?: string;
    organizationId?: string;
    roleName?: string;
    roleId?: string;
    degaUsers?: IDegaUser[];
}

export class RoleMapping implements IRoleMapping {
    constructor(
        public id?: string,
        public name?: string,
        public organizationName?: string,
        public organizationId?: string,
        public roleName?: string,
        public roleId?: string,
        public degaUsers?: IDegaUser[]
    ) {}
}
