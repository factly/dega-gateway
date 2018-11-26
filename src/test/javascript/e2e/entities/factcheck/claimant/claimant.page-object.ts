import { element, by, ElementFinder } from 'protractor';

export class ClaimantComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-claimant div table .btn-danger'));
    title = element.all(by.css('jhi-claimant div h2#page-heading span')).first();

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

export class ClaimantUpdatePage {
    pageTitle = element(by.id('jhi-claimant-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    tagLineInput = element(by.id('field_tagLine'));
    descriptionInput = element(by.id('field_description'));
    imageURLInput = element(by.id('field_imageURL'));
    clientIdInput = element(by.id('field_clientId'));
    slugInput = element(by.id('field_slug'));
    createdDateInput = element(by.id('field_createdDate'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setTagLineInput(tagLine) {
        await this.tagLineInput.sendKeys(tagLine);
    }

    async getTagLineInput() {
        return this.tagLineInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setImageURLInput(imageURL) {
        await this.imageURLInput.sendKeys(imageURL);
    }

    async getImageURLInput() {
        return this.imageURLInput.getAttribute('value');
    }

    async setClientIdInput(clientId) {
        await this.clientIdInput.sendKeys(clientId);
    }

    async getClientIdInput() {
        return this.clientIdInput.getAttribute('value');
    }

    async setSlugInput(slug) {
        await this.slugInput.sendKeys(slug);
    }

    async getSlugInput() {
        return this.slugInput.getAttribute('value');
    }

    async setCreatedDateInput(createdDate) {
        await this.createdDateInput.sendKeys(createdDate);
    }

    async getCreatedDateInput() {
        return this.createdDateInput.getAttribute('value');
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

export class ClaimantDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-claimant-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-claimant'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
