import { element, by, ElementFinder } from 'protractor';

export class RatingComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-rating div table .btn-danger'));
    title = element.all(by.css('jhi-rating div h2#page-heading span')).first();

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

export class RatingUpdatePage {
    pageTitle = element(by.id('jhi-rating-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    numericValueInput = element(by.id('field_numericValue'));
    iconURLInput = element(by.id('field_iconURL'));
    isDefaultInput = element(by.id('field_isDefault'));
    clientIdInput = element(by.id('field_clientId'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setNumericValueInput(numericValue) {
        await this.numericValueInput.sendKeys(numericValue);
    }

    async getNumericValueInput() {
        return this.numericValueInput.getAttribute('value');
    }

    async setIconURLInput(iconURL) {
        await this.iconURLInput.sendKeys(iconURL);
    }

    async getIconURLInput() {
        return this.iconURLInput.getAttribute('value');
    }

    getIsDefaultInput() {
        return this.isDefaultInput;
    }
    async setClientIdInput(clientId) {
        await this.clientIdInput.sendKeys(clientId);
    }

    async getClientIdInput() {
        return this.clientIdInput.getAttribute('value');
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

export class RatingDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-rating-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-rating'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
