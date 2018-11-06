import { IOrganization } from 'app/shared/model/core/organization.model';

export interface IDegaUser {
    id?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    email?: string;
    website?: string;
    facebookURL?: string;
    twitterURL?: string;
    instagramURL?: string;
    linkedinURL?: string;
    githubURL?: string;
    profilePicture?: string;
    description?: string;
    isActive?: boolean;
    slug?: string;
    roleName?: string;
    roleId?: string;
    organizations?: IOrganization[];
    organizationDefaultName?: string;
    organizationDefaultId?: string;
}

export class DegaUser implements IDegaUser {
    constructor(
        public id?: string,
        public firstName?: string,
        public lastName?: string,
        public displayName?: string,
        public email?: string,
        public website?: string,
        public facebookURL?: string,
        public twitterURL?: string,
        public instagramURL?: string,
        public linkedinURL?: string,
        public githubURL?: string,
        public profilePicture?: string,
        public description?: string,
        public isActive?: boolean,
        public slug?: string,
        public roleName?: string,
        public roleId?: string,
        public organizations?: IOrganization[],
        public organizationDefaultName?: string,
        public organizationDefaultId?: string
    ) {
        this.isActive = this.isActive || false;
    }
}
