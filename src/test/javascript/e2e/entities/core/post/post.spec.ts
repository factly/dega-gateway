/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PostComponentsPage, PostDeleteDialog, PostUpdatePage } from './post.page-object';

const expect = chai.expect;

describe('Post e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let postUpdatePage: PostUpdatePage;
    let postComponentsPage: PostComponentsPage;
    /*let postDeleteDialog: PostDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Posts', async () => {
        await navBarPage.goToEntity('post');
        postComponentsPage = new PostComponentsPage();
        expect(await postComponentsPage.getTitle()).to.eq('gatewayApp.corePost.home.title');
    });

    it('should load create Post page', async () => {
        await postComponentsPage.clickOnCreateButton();
        postUpdatePage = new PostUpdatePage();
        expect(await postUpdatePage.getPageTitle()).to.eq('gatewayApp.corePost.home.createOrEditLabel');
        await postUpdatePage.cancel();
    });

    /* it('should create and save Posts', async () => {
        const nbButtonsBeforeCreate = await postComponentsPage.countDeleteButtons();

        await postComponentsPage.clickOnCreateButton();
        await promise.all([
            postUpdatePage.setTitleInput('title'),
            postUpdatePage.setContentInput('content'),
            postUpdatePage.setExcerptInput('excerpt'),
            postUpdatePage.setPublishedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            postUpdatePage.setLastUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            postUpdatePage.setUpdatesInput('updates'),
            postUpdatePage.setSlugInput('slug'),
            postUpdatePage.setPasswordInput('password'),
            postUpdatePage.setFeaturedMediaInput('featuredMedia'),
            postUpdatePage.setSubTitleInput('subTitle'),
            postUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            // postUpdatePage.tagSelectLastOption(),
            // postUpdatePage.categorySelectLastOption(),
            postUpdatePage.statusSelectLastOption(),
            postUpdatePage.formatSelectLastOption(),
            // postUpdatePage.degaUserSelectLastOption(),
        ]);
        expect(await postUpdatePage.getTitleInput()).to.eq('title');
        expect(await postUpdatePage.getContentInput()).to.eq('content');
        expect(await postUpdatePage.getExcerptInput()).to.eq('excerpt');
        expect(await postUpdatePage.getPublishedDateInput()).to.contain('2001-01-01T02:30');
        expect(await postUpdatePage.getLastUpdatedDateInput()).to.contain('2001-01-01T02:30');
        const selectedFeatured = postUpdatePage.getFeaturedInput();
        if (await selectedFeatured.isSelected()) {
            await postUpdatePage.getFeaturedInput().click();
            expect(await postUpdatePage.getFeaturedInput().isSelected()).to.be.false;
        } else {
            await postUpdatePage.getFeaturedInput().click();
            expect(await postUpdatePage.getFeaturedInput().isSelected()).to.be.true;
        }
        const selectedSticky = postUpdatePage.getStickyInput();
        if (await selectedSticky.isSelected()) {
            await postUpdatePage.getStickyInput().click();
            expect(await postUpdatePage.getStickyInput().isSelected()).to.be.false;
        } else {
            await postUpdatePage.getStickyInput().click();
            expect(await postUpdatePage.getStickyInput().isSelected()).to.be.true;
        }
        expect(await postUpdatePage.getUpdatesInput()).to.eq('updates');
        expect(await postUpdatePage.getSlugInput()).to.eq('slug');
        expect(await postUpdatePage.getPasswordInput()).to.eq('password');
        expect(await postUpdatePage.getFeaturedMediaInput()).to.eq('featuredMedia');
        expect(await postUpdatePage.getSubTitleInput()).to.eq('subTitle');
        expect(await postUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
        await postUpdatePage.save();
        expect(await postUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await postComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last Post', async () => {
        const nbButtonsBeforeDelete = await postComponentsPage.countDeleteButtons();
        await postComponentsPage.clickOnLastDeleteButton();

        postDeleteDialog = new PostDeleteDialog();
        expect(await postDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.corePost.delete.question');
        await postDeleteDialog.clickOnConfirmButton();

        expect(await postComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
