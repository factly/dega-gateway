/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { FactcheckComponentsPage, FactcheckDeleteDialog, FactcheckUpdatePage } from './factcheck.page-object';

const expect = chai.expect;

describe('Factcheck e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let factcheckUpdatePage: FactcheckUpdatePage;
    let factcheckComponentsPage: FactcheckComponentsPage;
    /*let factcheckDeleteDialog: FactcheckDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Factchecks', async () => {
        await navBarPage.goToEntity('factcheck');
        factcheckComponentsPage = new FactcheckComponentsPage();
        expect(await factcheckComponentsPage.getTitle()).to.eq('gatewayApp.factcheckFactcheck.home.title');
    });

    it('should load create Factcheck page', async () => {
        await factcheckComponentsPage.clickOnCreateButton();
        factcheckUpdatePage = new FactcheckUpdatePage();
        expect(await factcheckUpdatePage.getPageTitle()).to.eq('gatewayApp.factcheckFactcheck.home.createOrEditLabel');
        await factcheckUpdatePage.cancel();
    });

    /* it('should create and save Factchecks', async () => {
        const nbButtonsBeforeCreate = await factcheckComponentsPage.countDeleteButtons();

        await factcheckComponentsPage.clickOnCreateButton();
        await promise.all([
            factcheckUpdatePage.setTitleInput('title'),
            factcheckUpdatePage.setIntroductionInput('introduction'),
            factcheckUpdatePage.setSummaryInput('summary'),
            factcheckUpdatePage.setExcerptInput('excerpt'),
            factcheckUpdatePage.setPublishedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            factcheckUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            factcheckUpdatePage.setUpdatesInput('updates'),
            factcheckUpdatePage.setSlugInput('slug'),
            factcheckUpdatePage.setPasswordInput('password'),
            factcheckUpdatePage.setFeaturedMediaInput('featuredMedia'),
            factcheckUpdatePage.setSubTitleInput('subTitle'),
            factcheckUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            // factcheckUpdatePage.claimSelectLastOption(),
        ]);
        expect(await factcheckUpdatePage.getTitleInput()).to.eq('title');
        expect(await factcheckUpdatePage.getIntroductionInput()).to.eq('introduction');
        expect(await factcheckUpdatePage.getSummaryInput()).to.eq('summary');
        expect(await factcheckUpdatePage.getExcerptInput()).to.eq('excerpt');
        expect(await factcheckUpdatePage.getPublishedDateInput()).to.contain('2001-01-01T02:30');
        expect(await factcheckUpdatePage.getLastUpdatedDateInput()).to.contain('2001-01-01T02:30');
        const selectedFeatured = factcheckUpdatePage.getFeaturedInput();
        if (await selectedFeatured.isSelected()) {
            await factcheckUpdatePage.getFeaturedInput().click();
            expect(await factcheckUpdatePage.getFeaturedInput().isSelected()).to.be.false;
        } else {
            await factcheckUpdatePage.getFeaturedInput().click();
            expect(await factcheckUpdatePage.getFeaturedInput().isSelected()).to.be.true;
        }
        const selectedSticky = factcheckUpdatePage.getStickyInput();
        if (await selectedSticky.isSelected()) {
            await factcheckUpdatePage.getStickyInput().click();
            expect(await factcheckUpdatePage.getStickyInput().isSelected()).to.be.false;
        } else {
            await factcheckUpdatePage.getStickyInput().click();
            expect(await factcheckUpdatePage.getStickyInput().isSelected()).to.be.true;
        }
        expect(await factcheckUpdatePage.getUpdatesInput()).to.eq('updates');
        expect(await factcheckUpdatePage.getSlugInput()).to.eq('slug');
        expect(await factcheckUpdatePage.getPasswordInput()).to.eq('password');
        expect(await factcheckUpdatePage.getFeaturedMediaInput()).to.eq('featuredMedia');
        expect(await factcheckUpdatePage.getSubTitleInput()).to.eq('subTitle');
        expect(await factcheckUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
        await factcheckUpdatePage.save();
        expect(await factcheckUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await factcheckComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Factcheck', async () => {
        const nbButtonsBeforeDelete = await factcheckComponentsPage.countDeleteButtons();
        await factcheckComponentsPage.clickOnLastDeleteButton();

        factcheckDeleteDialog = new FactcheckDeleteDialog();
        expect(await factcheckDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.factcheckFactcheck.delete.question');
        await factcheckDeleteDialog.clickOnConfirmButton();

        expect(await factcheckComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
