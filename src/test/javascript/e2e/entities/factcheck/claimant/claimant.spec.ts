/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ClaimantComponentsPage, ClaimantDeleteDialog, ClaimantUpdatePage } from './claimant.page-object';

const expect = chai.expect;

describe('Claimant e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let claimantUpdatePage: ClaimantUpdatePage;
    let claimantComponentsPage: ClaimantComponentsPage;
    let claimantDeleteDialog: ClaimantDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Claimants', async () => {
        await navBarPage.goToEntity('claimant');
        claimantComponentsPage = new ClaimantComponentsPage();
        expect(await claimantComponentsPage.getTitle()).to.eq('gatewayApp.factcheckClaimant.home.title');
    });

    it('should load create Claimant page', async () => {
        await claimantComponentsPage.clickOnCreateButton();
        claimantUpdatePage = new ClaimantUpdatePage();
        expect(await claimantUpdatePage.getPageTitle()).to.eq('gatewayApp.factcheckClaimant.home.createOrEditLabel');
        await claimantUpdatePage.cancel();
    });

    it('should create and save Claimants', async () => {
        const nbButtonsBeforeCreate = await claimantComponentsPage.countDeleteButtons();

        await claimantComponentsPage.clickOnCreateButton();
        await promise.all([
            claimantUpdatePage.setNameInput('name'),
            claimantUpdatePage.setTagLineInput('tagLine'),
            claimantUpdatePage.setDescriptionInput('description'),
            claimantUpdatePage.setImageURLInput('imageURL'),
            claimantUpdatePage.setSlugInput('slug'),
            claimantUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            claimantUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await claimantUpdatePage.getNameInput()).to.eq('name');
        expect(await claimantUpdatePage.getTagLineInput()).to.eq('tagLine');
        expect(await claimantUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await claimantUpdatePage.getImageURLInput()).to.eq('imageURL');
        expect(await claimantUpdatePage.getSlugInput()).to.eq('slug');
        expect(await claimantUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
        expect(await claimantUpdatePage.getLastUpdatedDateInput()).to.contain('2001-01-01T02:30');
        await claimantUpdatePage.save();
        expect(await claimantUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await claimantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Claimant', async () => {
        const nbButtonsBeforeDelete = await claimantComponentsPage.countDeleteButtons();
        await claimantComponentsPage.clickOnLastDeleteButton();

        claimantDeleteDialog = new ClaimantDeleteDialog();
        expect(await claimantDeleteDialog.getDialogTitle()).to.eq('gatewayApp.factcheckClaimant.delete.question');
        await claimantDeleteDialog.clickOnConfirmButton();

        expect(await claimantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
