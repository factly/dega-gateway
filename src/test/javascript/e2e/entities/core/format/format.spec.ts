/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { FormatComponentsPage, FormatDeleteDialog, FormatUpdatePage } from './format.page-object';

const expect = chai.expect;

describe('Format e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let formatUpdatePage: FormatUpdatePage;
    let formatComponentsPage: FormatComponentsPage;
    let formatDeleteDialog: FormatDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Formats', async () => {
        await navBarPage.goToEntity('format');
        formatComponentsPage = new FormatComponentsPage();
        expect(await formatComponentsPage.getTitle()).to.eq('gatewayApp.coreFormat.home.title');
    });

    it('should load create Format page', async () => {
        await formatComponentsPage.clickOnCreateButton();
        formatUpdatePage = new FormatUpdatePage();
        expect(await formatUpdatePage.getPageTitle()).to.eq('gatewayApp.coreFormat.home.createOrEditLabel');
        await formatUpdatePage.cancel();
    });

    it('should create and save Formats', async () => {
        const nbButtonsBeforeCreate = await formatComponentsPage.countDeleteButtons();

        await formatComponentsPage.clickOnCreateButton();
        await promise.all([
            formatUpdatePage.setNameInput('name'),
            formatUpdatePage.setClientIdInput('clientId'),
            formatUpdatePage.setDescriptionInput('description'),
            formatUpdatePage.setSlugInput('slug')
        ]);
        expect(await formatUpdatePage.getNameInput()).to.eq('name');
        const selectedIsDefault = formatUpdatePage.getIsDefaultInput();
        if (await selectedIsDefault.isSelected()) {
            await formatUpdatePage.getIsDefaultInput().click();
            expect(await formatUpdatePage.getIsDefaultInput().isSelected()).to.be.false;
        } else {
            await formatUpdatePage.getIsDefaultInput().click();
            expect(await formatUpdatePage.getIsDefaultInput().isSelected()).to.be.true;
        }
        expect(await formatUpdatePage.getClientIdInput()).to.eq('clientId');
        expect(await formatUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await formatUpdatePage.getSlugInput()).to.eq('slug');
        await formatUpdatePage.save();
        expect(await formatUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await formatComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Format', async () => {
        const nbButtonsBeforeDelete = await formatComponentsPage.countDeleteButtons();
        await formatComponentsPage.clickOnLastDeleteButton();

        formatDeleteDialog = new FormatDeleteDialog();
        expect(await formatDeleteDialog.getDialogTitle()).to.eq('gatewayApp.coreFormat.delete.question');
        await formatDeleteDialog.clickOnConfirmButton();

        expect(await formatComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
