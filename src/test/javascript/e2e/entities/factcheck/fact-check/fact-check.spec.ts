/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { FactCheckComponentsPage, FactCheckDeleteDialog, FactCheckUpdatePage } from './fact-check.page-object';

const expect = chai.expect;

describe('FactCheck e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let factCheckUpdatePage: FactCheckUpdatePage;
    let factCheckComponentsPage: FactCheckComponentsPage;
    /*let factCheckDeleteDialog: FactCheckDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load FactChecks', async () => {
        await navBarPage.goToEntity('fact-check');
        factCheckComponentsPage = new FactCheckComponentsPage();
        expect(await factCheckComponentsPage.getTitle()).to.eq('gatewayApp.factcheckFactCheck.home.title');
    });

    it('should load create FactCheck page', async () => {
        await factCheckComponentsPage.clickOnCreateButton();
        factCheckUpdatePage = new FactCheckUpdatePage();
        expect(await factCheckUpdatePage.getPageTitle()).to.eq('gatewayApp.factcheckFactCheck.home.createOrEditLabel');
        await factCheckUpdatePage.cancel();
    });

    /* it('should create and save FactChecks', async () => {
        const nbButtonsBeforeCreate = await factCheckComponentsPage.countDeleteButtons();

        await factCheckComponentsPage.clickOnCreateButton();
        await promise.all([
            factCheckUpdatePage.setTitleInput('title'),
            factCheckUpdatePage.setClientIdInput('clientId'),
            factCheckUpdatePage.setIntroductionInput('introduction'),
            factCheckUpdatePage.setSummaryInput('summary'),
            factCheckUpdatePage.setExcerptInput('excerpt'),
            factCheckUpdatePage.setPublishedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            factCheckUpdatePage.setPublishedDateGMTInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            factCheckUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            factCheckUpdatePage.setLastUpdatedDateGMTInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            factCheckUpdatePage.setUpdatesInput('updates'),
            factCheckUpdatePage.setSlugInput('slug'),
            factCheckUpdatePage.setPasswordInput('password'),
            factCheckUpdatePage.setFeaturedMediaInput('featuredMedia'),
            factCheckUpdatePage.setSubTitleInput('subTitle'),
            // factCheckUpdatePage.claimSelectLastOption(),
        ]);
        expect(await factCheckUpdatePage.getTitleInput()).to.eq('title');
        expect(await factCheckUpdatePage.getClientIdInput()).to.eq('clientId');
        expect(await factCheckUpdatePage.getIntroductionInput()).to.eq('introduction');
        expect(await factCheckUpdatePage.getSummaryInput()).to.eq('summary');
        expect(await factCheckUpdatePage.getExcerptInput()).to.eq('excerpt');
        expect(await factCheckUpdatePage.getPublishedDateInput()).to.contain('2001-01-01T02:30');
        expect(await factCheckUpdatePage.getPublishedDateGMTInput()).to.contain('2001-01-01T02:30');
        expect(await factCheckUpdatePage.getLastUpdatedDateInput()).to.contain('2001-01-01T02:30');
        expect(await factCheckUpdatePage.getLastUpdatedDateGMTInput()).to.contain('2001-01-01T02:30');
        const selectedFeatured = factCheckUpdatePage.getFeaturedInput();
        if (await selectedFeatured.isSelected()) {
            await factCheckUpdatePage.getFeaturedInput().click();
            expect(await factCheckUpdatePage.getFeaturedInput().isSelected()).to.be.false;
        } else {
            await factCheckUpdatePage.getFeaturedInput().click();
            expect(await factCheckUpdatePage.getFeaturedInput().isSelected()).to.be.true;
        }
        const selectedSticky = factCheckUpdatePage.getStickyInput();
        if (await selectedSticky.isSelected()) {
            await factCheckUpdatePage.getStickyInput().click();
            expect(await factCheckUpdatePage.getStickyInput().isSelected()).to.be.false;
        } else {
            await factCheckUpdatePage.getStickyInput().click();
            expect(await factCheckUpdatePage.getStickyInput().isSelected()).to.be.true;
        }
        expect(await factCheckUpdatePage.getUpdatesInput()).to.eq('updates');
        expect(await factCheckUpdatePage.getSlugInput()).to.eq('slug');
        expect(await factCheckUpdatePage.getPasswordInput()).to.eq('password');
        expect(await factCheckUpdatePage.getFeaturedMediaInput()).to.eq('featuredMedia');
        expect(await factCheckUpdatePage.getSubTitleInput()).to.eq('subTitle');
        await factCheckUpdatePage.save();
        expect(await factCheckUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await factCheckComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last FactCheck', async () => {
        const nbButtonsBeforeDelete = await factCheckComponentsPage.countDeleteButtons();
        await factCheckComponentsPage.clickOnLastDeleteButton();

        factCheckDeleteDialog = new FactCheckDeleteDialog();
        expect(await factCheckDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.factcheckFactCheck.delete.question');
        await factCheckDeleteDialog.clickOnConfirmButton();

        expect(await factCheckComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
