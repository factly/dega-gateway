/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { CategoryComponentsPage, CategoryDeleteDialog, CategoryUpdatePage } from './category.page-object';

const expect = chai.expect;

describe('Category e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let categoryUpdatePage: CategoryUpdatePage;
    let categoryComponentsPage: CategoryComponentsPage;
    let categoryDeleteDialog: CategoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Categories', async () => {
        await navBarPage.goToEntity('category');
        categoryComponentsPage = new CategoryComponentsPage();
        expect(await categoryComponentsPage.getTitle()).to.eq('gatewayApp.coreCategory.home.title');
    });

    it('should load create Category page', async () => {
        await categoryComponentsPage.clickOnCreateButton();
        categoryUpdatePage = new CategoryUpdatePage();
        expect(await categoryUpdatePage.getPageTitle()).to.eq('gatewayApp.coreCategory.home.createOrEditLabel');
        await categoryUpdatePage.cancel();
    });

    it('should create and save Categories', async () => {
        const nbButtonsBeforeCreate = await categoryComponentsPage.countDeleteButtons();

        await categoryComponentsPage.clickOnCreateButton();
        await promise.all([
            categoryUpdatePage.setNameInput('name'),
            categoryUpdatePage.setDescriptionInput('description'),
            categoryUpdatePage.setSlugInput('slug'),
            categoryUpdatePage.setParentInput('parent'),
            categoryUpdatePage.setClientIdInput('clientId'),
            categoryUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await categoryUpdatePage.getNameInput()).to.eq('name');
        expect(await categoryUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await categoryUpdatePage.getSlugInput()).to.eq('slug');
        expect(await categoryUpdatePage.getParentInput()).to.eq('parent');
        expect(await categoryUpdatePage.getClientIdInput()).to.eq('clientId');
        expect(await categoryUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
        await categoryUpdatePage.save();
        expect(await categoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await categoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Category', async () => {
        const nbButtonsBeforeDelete = await categoryComponentsPage.countDeleteButtons();
        await categoryComponentsPage.clickOnLastDeleteButton();

        categoryDeleteDialog = new CategoryDeleteDialog();
        expect(await categoryDeleteDialog.getDialogTitle()).to.eq('gatewayApp.coreCategory.delete.question');
        await categoryDeleteDialog.clickOnConfirmButton();

        expect(await categoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
