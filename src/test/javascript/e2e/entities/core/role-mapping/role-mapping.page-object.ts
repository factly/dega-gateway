import { element, by, ElementFinder } from 'protractor';

export class RoleMappingComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-role-mapping div table .btn-danger'));
    title = element.all(by.css('jhi-role-mapping div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RoleMappingUpdatePage {
    pageTitle = element(by.id('jhi-role-mapping-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    organizationSelect = element(by.id('field_organization'));
    roleSelect = element(by.id('field_role'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async organizationSelectLastOption() {
        await this.organizationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async organizationSelectOption(option) {
        await this.organizationSelect.sendKeys(option);
    }

    getOrganizationSelect(): ElementFinder {
        return this.organizationSelect;
    }

    async getOrganizationSelectedOption() {
        return this.organizationSelect.element(by.css('option:checked')).getText();
    }

    async roleSelectLastOption() {
        await this.roleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async roleSelectOption(option) {
        await this.roleSelect.sendKeys(option);
    }

    getRoleSelect(): ElementFinder {
        return this.roleSelect;
    }

    async getRoleSelectedOption() {
        return this.roleSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class RoleMappingDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-roleMapping-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-roleMapping'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
