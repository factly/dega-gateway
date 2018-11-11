/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ClaimComponentsPage, ClaimDeleteDialog, ClaimUpdatePage } from './claim.page-object';

const expect = chai.expect;

describe('Claim e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let claimUpdatePage: ClaimUpdatePage;
    let claimComponentsPage: ClaimComponentsPage;
    /*let claimDeleteDialog: ClaimDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Claims', async () => {
        await navBarPage.goToEntity('claim');
        claimComponentsPage = new ClaimComponentsPage();
        expect(await claimComponentsPage.getTitle()).to.eq('gatewayApp.factcheckClaim.home.title');
    });

    it('should load create Claim page', async () => {
        await claimComponentsPage.clickOnCreateButton();
        claimUpdatePage = new ClaimUpdatePage();
        expect(await claimUpdatePage.getPageTitle()).to.eq('gatewayApp.factcheckClaim.home.createOrEditLabel');
        await claimUpdatePage.cancel();
    });

    /* it('should create and save Claims', async () => {
        const nbButtonsBeforeCreate = await claimComponentsPage.countDeleteButtons();

        await claimComponentsPage.clickOnCreateButton();
        await promise.all([
            claimUpdatePage.setClaimInput('claim'),
            claimUpdatePage.setDescriptionInput('description'),
            claimUpdatePage.setClaimDateInput('2000-12-31'),
            claimUpdatePage.setClaimSourceInput('claimSource'),
            claimUpdatePage.setCheckedDateInput('2000-12-31'),
            claimUpdatePage.setReviewSourcesInput('reviewSources'),
            claimUpdatePage.setReviewInput('review'),
            claimUpdatePage.setReviewTagLineInput('reviewTagLine'),
            claimUpdatePage.setClientIdInput('clientId'),
            claimUpdatePage.claimantSelectLastOption(),
            claimUpdatePage.ratingSelectLastOption(),
        ]);
        expect(await claimUpdatePage.getClaimInput()).to.eq('claim');
        expect(await claimUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await claimUpdatePage.getClaimDateInput()).to.eq('2000-12-31');
        expect(await claimUpdatePage.getClaimSourceInput()).to.eq('claimSource');
        expect(await claimUpdatePage.getCheckedDateInput()).to.eq('2000-12-31');
        expect(await claimUpdatePage.getReviewSourcesInput()).to.eq('reviewSources');
        expect(await claimUpdatePage.getReviewInput()).to.eq('review');
        expect(await claimUpdatePage.getReviewTagLineInput()).to.eq('reviewTagLine');
        expect(await claimUpdatePage.getClientIdInput()).to.eq('clientId');
        await claimUpdatePage.save();
        expect(await claimUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await claimComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Claim', async () => {
        const nbButtonsBeforeDelete = await claimComponentsPage.countDeleteButtons();
        await claimComponentsPage.clickOnLastDeleteButton();

        claimDeleteDialog = new ClaimDeleteDialog();
        expect(await claimDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.factcheckClaim.delete.question');
        await claimDeleteDialog.clickOnConfirmButton();

        expect(await claimComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
