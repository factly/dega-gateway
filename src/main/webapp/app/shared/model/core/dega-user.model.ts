import { Moment } from 'moment';
import { IOrganization } from 'app/shared/model/core/organization.model';
import { IPost } from 'app/shared/model/core/post.model';
import { IRoleMapping } from 'app/shared/model/core/role-mapping.model';
import { IMedia } from 'app/shared/model/core/media.model';

export interface IDegaUser {
    id?: string;
    keycloakId?: String;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    website?: string;
    facebookURL?: string;
    twitterURL?: string;
    instagramURL?: string;
    linkedinURL?: string;
    githubURL?: string;
    profilePicture?: string;
    description?: string;
    slug?: string;
    enabled?: boolean;
    emailVerified?: boolean;
    isSuperAdmin?: boolean;
    email?: string;
    createdDate?: Moment;
    roleName?: string;
    roleId?: string;
    organizations?: IOrganization[];
    organizationDefaultName?: string;
    organizationDefaultId?: string;
    organizationCurrentName?: string;
    organizationCurrentId?: string;
    organizationDefault?: IOrganization;
    organizationCurrent?: IOrganization;
    posts?: IPost[];
    roleMappings?: IRoleMapping[];
    mediaDTO?: IMedia;
}

export class DegaUser implements IDegaUser {
    constructor(
        public id?: string,
        public keycloakId?: string,
        public firstName?: string,
        public lastName?: string,
        public displayName?: string,
        public website?: string,
        public facebookURL?: string,
        public twitterURL?: string,
        public instagramURL?: string,
        public linkedinURL?: string,
        public githubURL?: string,
        public profilePicture?: string,
        public description?: string,
        public slug?: string,
        public enabled?: boolean,
        public emailVerified?: boolean,
        public isSuperAdmin?: boolean,
        public email?: string,
        public createdDate?: Moment,
        public roleName?: string,
        public roleId?: string,
        public organizations?: IOrganization[],
        public organizationDefaultName?: string,
        public organizationDefaultId?: string,
        public organizationCurrentName?: string,
        public organizationCurrentId?: string,
        public posts?: IPost[],
        public roleMappings?: IRoleMapping[],
        public organizationDefault?: IOrganization,
        public organizationCurrent?: IOrganization,
        public mediaDTO?: IMedia
    ) {
        this.enabled = this.enabled || false;
        this.emailVerified = this.emailVerified || false;
        this.isSuperAdmin = this.isSuperAdmin || false;
    }
}
