/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { RoleMappingComponentsPage, RoleMappingDeleteDialog, RoleMappingUpdatePage } from './role-mapping.page-object';

const expect = chai.expect;

describe('RoleMapping e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let roleMappingUpdatePage: RoleMappingUpdatePage;
    let roleMappingComponentsPage: RoleMappingComponentsPage;
    /*let roleMappingDeleteDialog: RoleMappingDeleteDialog;*/

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load RoleMappings', async () => {
        await navBarPage.goToEntity('role-mapping');
        roleMappingComponentsPage = new RoleMappingComponentsPage();
        expect(await roleMappingComponentsPage.getTitle()).to.eq('gatewayApp.coreRoleMapping.home.title');
    });

    it('should load create RoleMapping page', async () => {
        await roleMappingComponentsPage.clickOnCreateButton();
        roleMappingUpdatePage = new RoleMappingUpdatePage();
        expect(await roleMappingUpdatePage.getPageTitle()).to.eq('gatewayApp.coreRoleMapping.home.createOrEditLabel');
        await roleMappingUpdatePage.cancel();
    });

    /* it('should create and save RoleMappings', async () => {
        const nbButtonsBeforeCreate = await roleMappingComponentsPage.countDeleteButtons();

        await roleMappingComponentsPage.clickOnCreateButton();
        await promise.all([
            roleMappingUpdatePage.setNameInput('name'),
            roleMappingUpdatePage.organizationSelectLastOption(),
            roleMappingUpdatePage.roleSelectLastOption(),
        ]);
        expect(await roleMappingUpdatePage.getNameInput()).to.eq('name');
        await roleMappingUpdatePage.save();
        expect(await roleMappingUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await roleMappingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

    /* it('should delete last RoleMapping', async () => {
        const nbButtonsBeforeDelete = await roleMappingComponentsPage.countDeleteButtons();
        await roleMappingComponentsPage.clickOnLastDeleteButton();

        roleMappingDeleteDialog = new RoleMappingDeleteDialog();
        expect(await roleMappingDeleteDialog.getDialogTitle())
            .to.eq('gatewayApp.coreRoleMapping.delete.question');
        await roleMappingDeleteDialog.clickOnConfirmButton();

        expect(await roleMappingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
