/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { OrganizationComponentsPage, OrganizationDeleteDialog, OrganizationUpdatePage } from './organization.page-object';

const expect = chai.expect;

describe('Organization e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let organizationUpdatePage: OrganizationUpdatePage;
    let organizationComponentsPage: OrganizationComponentsPage;
    let organizationDeleteDialog: OrganizationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Organizations', async () => {
        await navBarPage.goToEntity('organization');
        organizationComponentsPage = new OrganizationComponentsPage();
        expect(await organizationComponentsPage.getTitle()).to.eq('gatewayApp.coreOrganization.home.title');
    });

    it('should load create Organization page', async () => {
        await organizationComponentsPage.clickOnCreateButton();
        organizationUpdatePage = new OrganizationUpdatePage();
        expect(await organizationUpdatePage.getPageTitle()).to.eq('gatewayApp.coreOrganization.home.createOrEditLabel');
        await organizationUpdatePage.cancel();
    });

    it('should create and save Organizations', async () => {
        const nbButtonsBeforeCreate = await organizationComponentsPage.countDeleteButtons();

        await organizationComponentsPage.clickOnCreateButton();
        await promise.all([
            organizationUpdatePage.setNameInput('name'),
            organizationUpdatePage.setEmailInput('email'),
            organizationUpdatePage.setPhoneInput('phone'),
            organizationUpdatePage.setSiteTitleInput('siteTitle'),
            organizationUpdatePage.setTagLineInput('tagLine'),
            organizationUpdatePage.setDescriptionInput('description'),
            organizationUpdatePage.setLogoURLInput('logoURL'),
            organizationUpdatePage.setLogoURLMobileInput('logoURLMobile'),
            organizationUpdatePage.setFavIconURLInput('favIconURL'),
            organizationUpdatePage.setMobileIconURLInput('mobileIconURL'),
            organizationUpdatePage.setBaiduVerificationCodeInput('baiduVerificationCode'),
            organizationUpdatePage.setBingVerificationCodeInput('bingVerificationCode'),
            organizationUpdatePage.setGoogleVerificationCodeInput('googleVerificationCode'),
            organizationUpdatePage.setYandexVerificationCodeInput('yandexVerificationCode'),
            organizationUpdatePage.setFacebookURLInput('facebookURL'),
            organizationUpdatePage.setTwitterURLInput('twitterURL'),
            organizationUpdatePage.setInstagramURLInput('instagramURL'),
            organizationUpdatePage.setLinkedInURLInput('linkedInURL'),
            organizationUpdatePage.setPinterestURLInput('pinterestURL'),
            organizationUpdatePage.setYouTubeURLInput('youTubeURL'),
            organizationUpdatePage.setGooglePlusURLInput('googlePlusURL'),
            organizationUpdatePage.setGithubURLInput('githubURL'),
            organizationUpdatePage.setFacebookPageAccessTokenInput('facebookPageAccessToken'),
            organizationUpdatePage.setGaTrackingCodeInput('gaTrackingCode'),
            organizationUpdatePage.setGithubClientIdInput('githubClientId'),
            organizationUpdatePage.setGithubClientSecretInput('githubClientSecret'),
            organizationUpdatePage.setTwitterClientIdInput('twitterClientId'),
            organizationUpdatePage.setTwitterClientSecretInput('twitterClientSecret'),
            organizationUpdatePage.setFacebookClientIdInput('facebookClientId'),
            organizationUpdatePage.setFacebookClientSecretInput('facebookClientSecret'),
            organizationUpdatePage.setGoogleClientIdInput('googleClientId'),
            organizationUpdatePage.setGoogleClientSecretInput('googleClientSecret'),
            organizationUpdatePage.setLinkedInClientIdInput('linkedInClientId'),
            organizationUpdatePage.setLinkedInClientSecretInput('linkedInClientSecret'),
            organizationUpdatePage.setInstagramClientIdInput('instagramClientId'),
            organizationUpdatePage.setInstagramClientSecretInput('instagramClientSecret'),
            organizationUpdatePage.setMailchimpAPIKeyInput('mailchimpAPIKey'),
            organizationUpdatePage.setSiteLanguageInput('siteLanguage'),
            organizationUpdatePage.setTimeZoneInput('timeZone'),
            organizationUpdatePage.setClientIdInput('clientId')
        ]);
        expect(await organizationUpdatePage.getNameInput()).to.eq('name');
        expect(await organizationUpdatePage.getEmailInput()).to.eq('email');
        expect(await organizationUpdatePage.getPhoneInput()).to.eq('phone');
        expect(await organizationUpdatePage.getSiteTitleInput()).to.eq('siteTitle');
        expect(await organizationUpdatePage.getTagLineInput()).to.eq('tagLine');
        expect(await organizationUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await organizationUpdatePage.getLogoURLInput()).to.eq('logoURL');
        expect(await organizationUpdatePage.getLogoURLMobileInput()).to.eq('logoURLMobile');
        expect(await organizationUpdatePage.getFavIconURLInput()).to.eq('favIconURL');
        expect(await organizationUpdatePage.getMobileIconURLInput()).to.eq('mobileIconURL');
        expect(await organizationUpdatePage.getBaiduVerificationCodeInput()).to.eq('baiduVerificationCode');
        expect(await organizationUpdatePage.getBingVerificationCodeInput()).to.eq('bingVerificationCode');
        expect(await organizationUpdatePage.getGoogleVerificationCodeInput()).to.eq('googleVerificationCode');
        expect(await organizationUpdatePage.getYandexVerificationCodeInput()).to.eq('yandexVerificationCode');
        expect(await organizationUpdatePage.getFacebookURLInput()).to.eq('facebookURL');
        expect(await organizationUpdatePage.getTwitterURLInput()).to.eq('twitterURL');
        expect(await organizationUpdatePage.getInstagramURLInput()).to.eq('instagramURL');
        expect(await organizationUpdatePage.getLinkedInURLInput()).to.eq('linkedInURL');
        expect(await organizationUpdatePage.getPinterestURLInput()).to.eq('pinterestURL');
        expect(await organizationUpdatePage.getYouTubeURLInput()).to.eq('youTubeURL');
        expect(await organizationUpdatePage.getGooglePlusURLInput()).to.eq('googlePlusURL');
        expect(await organizationUpdatePage.getGithubURLInput()).to.eq('githubURL');
        expect(await organizationUpdatePage.getFacebookPageAccessTokenInput()).to.eq('facebookPageAccessToken');
        expect(await organizationUpdatePage.getGaTrackingCodeInput()).to.eq('gaTrackingCode');
        expect(await organizationUpdatePage.getGithubClientIdInput()).to.eq('githubClientId');
        expect(await organizationUpdatePage.getGithubClientSecretInput()).to.eq('githubClientSecret');
        expect(await organizationUpdatePage.getTwitterClientIdInput()).to.eq('twitterClientId');
        expect(await organizationUpdatePage.getTwitterClientSecretInput()).to.eq('twitterClientSecret');
        expect(await organizationUpdatePage.getFacebookClientIdInput()).to.eq('facebookClientId');
        expect(await organizationUpdatePage.getFacebookClientSecretInput()).to.eq('facebookClientSecret');
        expect(await organizationUpdatePage.getGoogleClientIdInput()).to.eq('googleClientId');
        expect(await organizationUpdatePage.getGoogleClientSecretInput()).to.eq('googleClientSecret');
        expect(await organizationUpdatePage.getLinkedInClientIdInput()).to.eq('linkedInClientId');
        expect(await organizationUpdatePage.getLinkedInClientSecretInput()).to.eq('linkedInClientSecret');
        expect(await organizationUpdatePage.getInstagramClientIdInput()).to.eq('instagramClientId');
        expect(await organizationUpdatePage.getInstagramClientSecretInput()).to.eq('instagramClientSecret');
        expect(await organizationUpdatePage.getMailchimpAPIKeyInput()).to.eq('mailchimpAPIKey');
        expect(await organizationUpdatePage.getSiteLanguageInput()).to.eq('siteLanguage');
        expect(await organizationUpdatePage.getTimeZoneInput()).to.eq('timeZone');
        expect(await organizationUpdatePage.getClientIdInput()).to.eq('clientId');
        await organizationUpdatePage.save();
        expect(await organizationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await organizationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Organization', async () => {
        const nbButtonsBeforeDelete = await organizationComponentsPage.countDeleteButtons();
        await organizationComponentsPage.clickOnLastDeleteButton();

        organizationDeleteDialog = new OrganizationDeleteDialog();
        expect(await organizationDeleteDialog.getDialogTitle()).to.eq('gatewayApp.coreOrganization.delete.question');
        await organizationDeleteDialog.clickOnConfirmButton();

        expect(await organizationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
