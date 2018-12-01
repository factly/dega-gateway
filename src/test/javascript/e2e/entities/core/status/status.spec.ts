/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { StatusComponentsPage, StatusDeleteDialog, StatusUpdatePage } from './status.page-object';

const expect = chai.expect;

describe('Status e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let statusUpdatePage: StatusUpdatePage;
    let statusComponentsPage: StatusComponentsPage;
    let statusDeleteDialog: StatusDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Statuses', async () => {
        await navBarPage.goToEntity('status');
        statusComponentsPage = new StatusComponentsPage();
        expect(await statusComponentsPage.getTitle()).to.eq('gatewayApp.coreStatus.home.title');
    });

    it('should load create Status page', async () => {
        await statusComponentsPage.clickOnCreateButton();
        statusUpdatePage = new StatusUpdatePage();
        expect(await statusUpdatePage.getPageTitle()).to.eq('gatewayApp.coreStatus.home.createOrEditLabel');
        await statusUpdatePage.cancel();
    });

    it('should create and save Statuses', async () => {
        const nbButtonsBeforeCreate = await statusComponentsPage.countDeleteButtons();

        await statusComponentsPage.clickOnCreateButton();
        await promise.all([
            statusUpdatePage.setNameInput('name'),
            statusUpdatePage.setClientIdInput('clientId'),
            statusUpdatePage.setSlugInput('slug'),
            statusUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            statusUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await statusUpdatePage.getNameInput()).to.eq('name');
        expect(await statusUpdatePage.getClientIdInput()).to.eq('clientId');
        const selectedIsDefault = statusUpdatePage.getIsDefaultInput();
        if (await selectedIsDefault.isSelected()) {
            await statusUpdatePage.getIsDefaultInput().click();
            expect(await statusUpdatePage.getIsDefaultInput().isSelected()).to.be.false;
        } else {
            await statusUpdatePage.getIsDefaultInput().click();
            expect(await statusUpdatePage.getIsDefaultInput().isSelected()).to.be.true;
        }
        expect(await statusUpdatePage.getSlugInput()).to.eq('slug');
        expect(await statusUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
        expect(await statusUpdatePage.getLastUpdatedDateInput()).to.contain('2001-01-01T02:30');
        await statusUpdatePage.save();
        expect(await statusUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await statusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Status', async () => {
        const nbButtonsBeforeDelete = await statusComponentsPage.countDeleteButtons();
        await statusComponentsPage.clickOnLastDeleteButton();

        statusDeleteDialog = new StatusDeleteDialog();
        expect(await statusDeleteDialog.getDialogTitle()).to.eq('gatewayApp.coreStatus.delete.question');
        await statusDeleteDialog.clickOnConfirmButton();

        expect(await statusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
