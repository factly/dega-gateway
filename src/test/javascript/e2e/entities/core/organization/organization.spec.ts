/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
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
        await organizationUpdatePage.setNameInput('name');
        expect(await organizationUpdatePage.getNameInput()).to.eq('name');
        await organizationUpdatePage.setEmailInput('email');
        expect(await organizationUpdatePage.getEmailInput()).to.eq('email');
        await organizationUpdatePage.setPhoneInput('phone');
        expect(await organizationUpdatePage.getPhoneInput()).to.eq('phone');
        await organizationUpdatePage.setSiteTitleInput('siteTitle');
        expect(await organizationUpdatePage.getSiteTitleInput()).to.eq('siteTitle');
        await organizationUpdatePage.setTagLineInput('tagLine');
        expect(await organizationUpdatePage.getTagLineInput()).to.eq('tagLine');
        await organizationUpdatePage.setDescriptionInput('description');
        expect(await organizationUpdatePage.getDescriptionInput()).to.eq('description');
        await organizationUpdatePage.setLogoURLInput('logoURL');
        expect(await organizationUpdatePage.getLogoURLInput()).to.eq('logoURL');
        await organizationUpdatePage.setLogoURLMobileInput('logoURLMobile');
        expect(await organizationUpdatePage.getLogoURLMobileInput()).to.eq('logoURLMobile');
        await organizationUpdatePage.setFavIconURLInput('favIconURL');
        expect(await organizationUpdatePage.getFavIconURLInput()).to.eq('favIconURL');
        await organizationUpdatePage.setMobileIconURLInput('mobileIconURL');
        expect(await organizationUpdatePage.getMobileIconURLInput()).to.eq('mobileIconURL');
        await organizationUpdatePage.setBaiduVerificationCodeInput('baiduVerificationCode');
        expect(await organizationUpdatePage.getBaiduVerificationCodeInput()).to.eq('baiduVerificationCode');
        await organizationUpdatePage.setBingVerificationCodeInput('bingVerificationCode');
        expect(await organizationUpdatePage.getBingVerificationCodeInput()).to.eq('bingVerificationCode');
        await organizationUpdatePage.setGoogleVerificationCodeInput('googleVerificationCode');
        expect(await organizationUpdatePage.getGoogleVerificationCodeInput()).to.eq('googleVerificationCode');
        await organizationUpdatePage.setYandexVerificationCodeInput('yandexVerificationCode');
        expect(await organizationUpdatePage.getYandexVerificationCodeInput()).to.eq('yandexVerificationCode');
        await organizationUpdatePage.setFacebookURLInput('facebookURL');
        expect(await organizationUpdatePage.getFacebookURLInput()).to.eq('facebookURL');
        await organizationUpdatePage.setTwitterURLInput('twitterURL');
        expect(await organizationUpdatePage.getTwitterURLInput()).to.eq('twitterURL');
        await organizationUpdatePage.setInstagramURLInput('instagramURL');
        expect(await organizationUpdatePage.getInstagramURLInput()).to.eq('instagramURL');
        await organizationUpdatePage.setLinkedInURLInput('linkedInURL');
        expect(await organizationUpdatePage.getLinkedInURLInput()).to.eq('linkedInURL');
        await organizationUpdatePage.setPinterestURLInput('pinterestURL');
        expect(await organizationUpdatePage.getPinterestURLInput()).to.eq('pinterestURL');
        await organizationUpdatePage.setYouTubeURLInput('youTubeURL');
        expect(await organizationUpdatePage.getYouTubeURLInput()).to.eq('youTubeURL');
        await organizationUpdatePage.setGooglePlusURLInput('googlePlusURL');
        expect(await organizationUpdatePage.getGooglePlusURLInput()).to.eq('googlePlusURL');
        await organizationUpdatePage.setGithubURLInput('githubURL');
        expect(await organizationUpdatePage.getGithubURLInput()).to.eq('githubURL');
        await organizationUpdatePage.setFacebookPageAccessTokenInput('facebookPageAccessToken');
        expect(await organizationUpdatePage.getFacebookPageAccessTokenInput()).to.eq('facebookPageAccessToken');
        await organizationUpdatePage.setGaTrackingCodeInput('gaTrackingCode');
        expect(await organizationUpdatePage.getGaTrackingCodeInput()).to.eq('gaTrackingCode');
        await organizationUpdatePage.setGithubClientIdInput('githubClientId');
        expect(await organizationUpdatePage.getGithubClientIdInput()).to.eq('githubClientId');
        await organizationUpdatePage.setGithubClientSecretInput('githubClientSecret');
        expect(await organizationUpdatePage.getGithubClientSecretInput()).to.eq('githubClientSecret');
        await organizationUpdatePage.setTwitterClientIdInput('twitterClientId');
        expect(await organizationUpdatePage.getTwitterClientIdInput()).to.eq('twitterClientId');
        await organizationUpdatePage.setTwitterClientSecretInput('twitterClientSecret');
        expect(await organizationUpdatePage.getTwitterClientSecretInput()).to.eq('twitterClientSecret');
        await organizationUpdatePage.setFacebookClientIdInput('facebookClientId');
        expect(await organizationUpdatePage.getFacebookClientIdInput()).to.eq('facebookClientId');
        await organizationUpdatePage.setFacebookClientSecretInput('facebookClientSecret');
        expect(await organizationUpdatePage.getFacebookClientSecretInput()).to.eq('facebookClientSecret');
        await organizationUpdatePage.setGoogleClientIdInput('googleClientId');
        expect(await organizationUpdatePage.getGoogleClientIdInput()).to.eq('googleClientId');
        await organizationUpdatePage.setGoogleClientSecretInput('googleClientSecret');
        expect(await organizationUpdatePage.getGoogleClientSecretInput()).to.eq('googleClientSecret');
        await organizationUpdatePage.setLinkedInClientIdInput('linkedInClientId');
        expect(await organizationUpdatePage.getLinkedInClientIdInput()).to.eq('linkedInClientId');
        await organizationUpdatePage.setLinkedInClientSecretInput('linkedInClientSecret');
        expect(await organizationUpdatePage.getLinkedInClientSecretInput()).to.eq('linkedInClientSecret');
        await organizationUpdatePage.setInstagramClientIdInput('instagramClientId');
        expect(await organizationUpdatePage.getInstagramClientIdInput()).to.eq('instagramClientId');
        await organizationUpdatePage.setInstagramClientSecretInput('instagramClientSecret');
        expect(await organizationUpdatePage.getInstagramClientSecretInput()).to.eq('instagramClientSecret');
        await organizationUpdatePage.setMailchimpAPIKeyInput('mailchimpAPIKey');
        expect(await organizationUpdatePage.getMailchimpAPIKeyInput()).to.eq('mailchimpAPIKey');
        await organizationUpdatePage.setSiteLanguageInput('siteLanguage');
        expect(await organizationUpdatePage.getSiteLanguageInput()).to.eq('siteLanguage');
        await organizationUpdatePage.setTimeZoneInput('timeZone');
        expect(await organizationUpdatePage.getTimeZoneInput()).to.eq('timeZone');
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
