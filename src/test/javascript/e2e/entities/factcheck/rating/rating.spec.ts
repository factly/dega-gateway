/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { RatingComponentsPage, RatingDeleteDialog, RatingUpdatePage } from './rating.page-object';

const expect = chai.expect;

describe('Rating e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let ratingUpdatePage: RatingUpdatePage;
    let ratingComponentsPage: RatingComponentsPage;
    let ratingDeleteDialog: RatingDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Ratings', async () => {
        await navBarPage.goToEntity('rating');
        ratingComponentsPage = new RatingComponentsPage();
        expect(await ratingComponentsPage.getTitle()).to.eq('gatewayApp.factcheckRating.home.title');
    });

    it('should load create Rating page', async () => {
        await ratingComponentsPage.clickOnCreateButton();
        ratingUpdatePage = new RatingUpdatePage();
        expect(await ratingUpdatePage.getPageTitle()).to.eq('gatewayApp.factcheckRating.home.createOrEditLabel');
        await ratingUpdatePage.cancel();
    });

    it('should create and save Ratings', async () => {
        const nbButtonsBeforeCreate = await ratingComponentsPage.countDeleteButtons();

        await ratingComponentsPage.clickOnCreateButton();
        await promise.all([
            ratingUpdatePage.setNameInput('name'),
            ratingUpdatePage.setNumericValueInput('5'),
            ratingUpdatePage.setIconURLInput('iconURL'),
            ratingUpdatePage.setClientIdInput('clientId'),
            ratingUpdatePage.setSlugInput('slug'),
            ratingUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            ratingUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            ratingUpdatePage.setDescriptionInput('description')
        ]);
        expect(await ratingUpdatePage.getNameInput()).to.eq('name');
        expect(await ratingUpdatePage.getNumericValueInput()).to.eq('5');
        expect(await ratingUpdatePage.getIconURLInput()).to.eq('iconURL');
        const selectedIsDefault = ratingUpdatePage.getIsDefaultInput();
        if (await selectedIsDefault.isSelected()) {
            await ratingUpdatePage.getIsDefaultInput().click();
            expect(await ratingUpdatePage.getIsDefaultInput().isSelected()).to.be.false;
        } else {
            await ratingUpdatePage.getIsDefaultInput().click();
            expect(await ratingUpdatePage.getIsDefaultInput().isSelected()).to.be.true;
        }
        expect(await ratingUpdatePage.getClientIdInput()).to.eq('clientId');
        expect(await ratingUpdatePage.getSlugInput()).to.eq('slug');
        expect(await ratingUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
        expect(await ratingUpdatePage.getLastUpdatedDateInput()).to.contain('2001-01-01T02:30');
        expect(await ratingUpdatePage.getDescriptionInput()).to.eq('description');
        await ratingUpdatePage.save();
        expect(await ratingUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await ratingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Rating', async () => {
        const nbButtonsBeforeDelete = await ratingComponentsPage.countDeleteButtons();
        await ratingComponentsPage.clickOnLastDeleteButton();

        ratingDeleteDialog = new RatingDeleteDialog();
        expect(await ratingDeleteDialog.getDialogTitle()).to.eq('gatewayApp.factcheckRating.delete.question');
        await ratingDeleteDialog.clickOnConfirmButton();

        expect(await ratingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
