/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { DegaUserComponentsPage, DegaUserDeleteDialog, DegaUserUpdatePage } from './dega-user.page-object';

const expect = chai.expect;

describe('DegaUser e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let degaUserUpdatePage: DegaUserUpdatePage;
    let degaUserComponentsPage: DegaUserComponentsPage;
    /*let degaUserDeleteDialog: DegaUserDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load DegaUsers', async () => {
        await navBarPage.goToEntity('dega-user');
        degaUserComponentsPage = new DegaUserComponentsPage();
        expect(await degaUserComponentsPage.getTitle()).to.eq('gatewayApp.coreDegaUser.home.title');
    });

    it('should load create DegaUser page', async () => {
        await degaUserComponentsPage.clickOnCreateButton();
        degaUserUpdatePage = new DegaUserUpdatePage();
        expect(await degaUserUpdatePage.getPageTitle()).to.eq('gatewayApp.coreDegaUser.home.createOrEditLabel');
        await degaUserUpdatePage.cancel();
    });

    /* it('should create and save DegaUsers', async () => {
        const nbButtonsBeforeCreate = await degaUserComponentsPage.countDeleteButtons();

        await degaUserComponentsPage.clickOnCreateButton();
        await promise.all([
            degaUserUpdatePage.setFirstNameInput('firstName'),
            degaUserUpdatePage.setLastNameInput('lastName'),
            degaUserUpdatePage.setDisplayNameInput('displayName'),
            degaUserUpdatePage.setWebsiteInput('website'),
            degaUserUpdatePage.setFacebookURLInput('facebookURL'),
            degaUserUpdatePage.setTwitterURLInput('twitterURL'),
            degaUserUpdatePage.setInstagramURLInput('instagramURL'),
            degaUserUpdatePage.setLinkedinURLInput('linkedinURL'),
            degaUserUpdatePage.setGithubURLInput('githubURL'),
            degaUserUpdatePage.setProfilePictureInput('profilePicture'),
            degaUserUpdatePage.setDescriptionInput('description'),
            degaUserUpdatePage.setSlugInput('slug'),
            degaUserUpdatePage.setEmailInput('email'),
            degaUserUpdatePage.roleSelectLastOption(),
            // degaUserUpdatePage.organizationSelectLastOption(),
            degaUserUpdatePage.organizationDefaultSelectLastOption(),
            degaUserUpdatePage.organizationCurrentSelectLastOption(),
        ]);
        expect(await degaUserUpdatePage.getFirstNameInput()).to.eq('firstName');
        expect(await degaUserUpdatePage.getLastNameInput()).to.eq('lastName');
        expect(await degaUserUpdatePage.getDisplayNameInput()).to.eq('displayName');
        expect(await degaUserUpdatePage.getWebsiteInput()).to.eq('website');
        expect(await degaUserUpdatePage.getFacebookURLInput()).to.eq('facebookURL');
        expect(await degaUserUpdatePage.getTwitterURLInput()).to.eq('twitterURL');
        expect(await degaUserUpdatePage.getInstagramURLInput()).to.eq('instagramURL');
        expect(await degaUserUpdatePage.getLinkedinURLInput()).to.eq('linkedinURL');
        expect(await degaUserUpdatePage.getGithubURLInput()).to.eq('githubURL');
        expect(await degaUserUpdatePage.getProfilePictureInput()).to.eq('profilePicture');
        expect(await degaUserUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await degaUserUpdatePage.getSlugInput()).to.eq('slug');
        const selectedEnabled = degaUserUpdatePage.getEnabledInput();
        if (await selectedEnabled.isSelected()) {
            await degaUserUpdatePage.getEnabledInput().click();
            expect(await degaUserUpdatePage.getEnabledInput().isSelected()).to.be.false;
        } else {
            await degaUserUpdatePage.getEnabledInput().click();
            expect(await degaUserUpdatePage.getEnabledInput().isSelected()).to.be.true;
        }
        const selectedEmailVerified = degaUserUpdatePage.getEmailVerifiedInput();
        if (await selectedEmailVerified.isSelected()) {
            await degaUserUpdatePage.getEmailVerifiedInput().click();
            expect(await degaUserUpdatePage.getEmailVerifiedInput().isSelected()).to.be.false;
        } else {
            await degaUserUpdatePage.getEmailVerifiedInput().click();
            expect(await degaUserUpdatePage.getEmailVerifiedInput().isSelected()).to.be.true;
        }
        expect(await degaUserUpdatePage.getEmailInput()).to.eq('email');
        await degaUserUpdatePage.save();
        expect(await degaUserUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await degaUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last DegaUser', async () => {
        const nbButtonsBeforeDelete = await degaUserComponentsPage.countDeleteButtons();
        await degaUserComponentsPage.clickOnLastDeleteButton();

        degaUserDeleteDialog = new DegaUserDeleteDialog();
        expect(await degaUserDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.coreDegaUser.delete.question');
        await degaUserDeleteDialog.clickOnConfirmButton();

        expect(await degaUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
