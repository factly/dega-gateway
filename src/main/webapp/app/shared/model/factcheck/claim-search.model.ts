import { Moment } from 'moment';

export interface IClaimReview {
    languageCode?: string;
    publisher?: {
        name?: string;
        site?: string;
    };
    reviewDate?: Moment;
    textualRating?: string;
    title?: string;
    url?: string;
}

export interface IClaimSearchClaimDetails {
    claimDate?: Moment;
    claimReview?: Array<IClaimReview>;
    claimant?: string;
    text?: string;
}

export interface IClaimSearch {
    claims: Array<IClaimSearchClaimDetails>;
}
