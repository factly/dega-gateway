import { Moment } from 'moment';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { IRoleMapping } from 'app/shared/model/core/role-mapping.model';
import { IMedia } from 'app/shared/model/core/media.model';

export interface IOrganization {
    id?: string;
    name?: string;
    phone?: string;
    siteTitle?: string;
    tagLine?: string;
    description?: string;
    logoURL?: string;
    logoURLMobile?: string;
    favIconURL?: string;
    mobileIconURL?: string;
    baiduVerificationCode?: string;
    bingVerificationCode?: string;
    googleVerificationCode?: string;
    yandexVerificationCode?: string;
    facebookURL?: string;
    twitterURL?: string;
    instagramURL?: string;
    linkedInURL?: string;
    pinterestURL?: string;
    youTubeURL?: string;
    googlePlusURL?: string;
    githubURL?: string;
    facebookPageAccessToken?: string;
    gaTrackingCode?: string;
    githubClientId?: string;
    githubClientSecret?: string;
    twitterClientId?: string;
    twitterClientSecret?: string;
    facebookClientId?: string;
    facebookClientSecret?: string;
    googleClientId?: string;
    googleClientSecret?: string;
    linkedInClientId?: string;
    linkedInClientSecret?: string;
    instagramClientId?: string;
    instagramClientSecret?: string;
    mailchimpAPIKey?: string;
    siteLanguage?: string;
    timeZone?: string;
    clientId?: string;
    slug?: string;
    email?: string;
    createdDate?: Moment;
    lastUpdatedDate?: Moment;
    siteAddress?: string;
    enableFactchecking?: boolean;
    degaUsers?: IDegaUser[];
    degaUserDefaults?: IDegaUser[];
    degaUserCurrents?: IDegaUser[];
    roleMappings?: IRoleMapping[];
    mediaFaviconDTO?: IMedia;
    mediaLogoDTO?: IMedia;
    mediaMobileIconDTO?: IMedia;
    mediaMobileLogoDTO?: IMedia;
}

export class Organization implements IOrganization {
    constructor(
        public id?: string,
        public name?: string,
        public phone?: string,
        public siteTitle?: string,
        public tagLine?: string,
        public description?: string,
        public logoURL?: string,
        public logoURLMobile?: string,
        public favIconURL?: string,
        public mobileIconURL?: string,
        public baiduVerificationCode?: string,
        public bingVerificationCode?: string,
        public googleVerificationCode?: string,
        public yandexVerificationCode?: string,
        public facebookURL?: string,
        public twitterURL?: string,
        public instagramURL?: string,
        public linkedInURL?: string,
        public pinterestURL?: string,
        public youTubeURL?: string,
        public googlePlusURL?: string,
        public githubURL?: string,
        public facebookPageAccessToken?: string,
        public gaTrackingCode?: string,
        public githubClientId?: string,
        public githubClientSecret?: string,
        public twitterClientId?: string,
        public twitterClientSecret?: string,
        public facebookClientId?: string,
        public facebookClientSecret?: string,
        public googleClientId?: string,
        public googleClientSecret?: string,
        public linkedInClientId?: string,
        public linkedInClientSecret?: string,
        public instagramClientId?: string,
        public instagramClientSecret?: string,
        public mailchimpAPIKey?: string,
        public siteLanguage?: string,
        public timeZone?: string,
        public clientId?: string,
        public slug?: string,
        public email?: string,
        public createdDate?: Moment,
        public lastUpdatedDate?: Moment,
        public siteAddress?: string,
        public enableFactchecking?: boolean,
        public degaUsers?: IDegaUser[],
        public degaUserDefaults?: IDegaUser[],
        public degaUserCurrents?: IDegaUser[],
        public roleMappings?: IRoleMapping[],
        public mediaFaviconDTO?: IMedia,
        public mediaLogoDTO?: IMedia,
        public mediaMobileIconDTO?: IMedia,
        public mediaMobileLogoDTO?: IMedia
    ) {
        this.enableFactchecking = this.enableFactchecking || false;
    }
}
