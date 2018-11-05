import { IDegaUser } from 'app/shared/model/core/dega-user.model';

export interface IRole {
    id?: string;
    name?: string;
    clientId?: string;
    degaUsers?: IDegaUser[];
}

export class Role implements IRole {
    constructor(public id?: string, public name?: string, public clientId?: string, public degaUsers?: IDegaUser[]) {}
}
