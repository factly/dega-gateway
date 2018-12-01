/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { MediaComponentsPage, MediaDeleteDialog, MediaUpdatePage } from './media.page-object';

const expect = chai.expect;

describe('Media e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let mediaUpdatePage: MediaUpdatePage;
    let mediaComponentsPage: MediaComponentsPage;
    let mediaDeleteDialog: MediaDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Media', async () => {
        await navBarPage.goToEntity('media');
        mediaComponentsPage = new MediaComponentsPage();
        expect(await mediaComponentsPage.getTitle()).to.eq('gatewayApp.coreMedia.home.title');
    });

    it('should load create Media page', async () => {
        await mediaComponentsPage.clickOnCreateButton();
        mediaUpdatePage = new MediaUpdatePage();
        expect(await mediaUpdatePage.getPageTitle()).to.eq('gatewayApp.coreMedia.home.createOrEditLabel');
        await mediaUpdatePage.cancel();
    });

    it('should create and save Media', async () => {
        const nbButtonsBeforeCreate = await mediaComponentsPage.countDeleteButtons();

        await mediaComponentsPage.clickOnCreateButton();
        await promise.all([
            mediaUpdatePage.setNameInput('name'),
            mediaUpdatePage.setTypeInput('type'),
            mediaUpdatePage.setUrlInput('url'),
            mediaUpdatePage.setFileSizeInput('fileSize'),
            mediaUpdatePage.setDimensionsInput('dimensions'),
            mediaUpdatePage.setTitleInput('title'),
            mediaUpdatePage.setCaptionInput('caption'),
            mediaUpdatePage.setAltTextInput('altText'),
            mediaUpdatePage.setDescriptionInput('description'),
            mediaUpdatePage.setUploadedByInput('uploadedBy'),
            mediaUpdatePage.setPublishedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            mediaUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            mediaUpdatePage.setSlugInput('slug'),
            mediaUpdatePage.setClientIdInput('clientId'),
            mediaUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await mediaUpdatePage.getNameInput()).to.eq('name');
        expect(await mediaUpdatePage.getTypeInput()).to.eq('type');
        expect(await mediaUpdatePage.getUrlInput()).to.eq('url');
        expect(await mediaUpdatePage.getFileSizeInput()).to.eq('fileSize');
        expect(await mediaUpdatePage.getDimensionsInput()).to.eq('dimensions');
        expect(await mediaUpdatePage.getTitleInput()).to.eq('title');
        expect(await mediaUpdatePage.getCaptionInput()).to.eq('caption');
        expect(await mediaUpdatePage.getAltTextInput()).to.eq('altText');
        expect(await mediaUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await mediaUpdatePage.getUploadedByInput()).to.eq('uploadedBy');
        expect(await mediaUpdatePage.getPublishedDateInput()).to.contain('2001-01-01T02:30');
        expect(await mediaUpdatePage.getLastUpdatedDateInput()).to.contain('2001-01-01T02:30');
        expect(await mediaUpdatePage.getSlugInput()).to.eq('slug');
        expect(await mediaUpdatePage.getClientIdInput()).to.eq('clientId');
        expect(await mediaUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
        await mediaUpdatePage.save();
        expect(await mediaUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await mediaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Media', async () => {
        const nbButtonsBeforeDelete = await mediaComponentsPage.countDeleteButtons();
        await mediaComponentsPage.clickOnLastDeleteButton();

        mediaDeleteDialog = new MediaDeleteDialog();
        expect(await mediaDeleteDialog.getDialogTitle()).to.eq('gatewayApp.coreMedia.delete.question');
        await mediaDeleteDialog.clickOnConfirmButton();

        expect(await mediaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
