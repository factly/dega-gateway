import { element, by, ElementFinder } from 'protractor';

export class MediaComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-media div table .btn-danger'));
    title = element.all(by.css('jhi-media div h2#page-heading span')).first();

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

export class MediaUpdatePage {
    pageTitle = element(by.id('jhi-media-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    typeInput = element(by.id('field_type'));
    urlInput = element(by.id('field_url'));
    fileSizeInput = element(by.id('field_fileSize'));
    dimensionsInput = element(by.id('field_dimensions'));
    titleInput = element(by.id('field_title'));
    captionInput = element(by.id('field_caption'));
    altTextInput = element(by.id('field_altText'));
    descriptionInput = element(by.id('field_description'));
    uploadedByInput = element(by.id('field_uploadedBy'));
    publishedDateInput = element(by.id('field_publishedDate'));
    publishedDateGMTInput = element(by.id('field_publishedDateGMT'));
    lastUpdatedDateInput = element(by.id('field_lastUpdatedDate'));
    lastUpdatedDateGMTInput = element(by.id('field_lastUpdatedDateGMT'));
    slugInput = element(by.id('field_slug'));
    clientIdInput = element(by.id('field_clientId'));
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

    async setTypeInput(type) {
        await this.typeInput.sendKeys(type);
    }

    async getTypeInput() {
        return this.typeInput.getAttribute('value');
    }

    async setUrlInput(url) {
        await this.urlInput.sendKeys(url);
    }

    async getUrlInput() {
        return this.urlInput.getAttribute('value');
    }

    async setFileSizeInput(fileSize) {
        await this.fileSizeInput.sendKeys(fileSize);
    }

    async getFileSizeInput() {
        return this.fileSizeInput.getAttribute('value');
    }

    async setDimensionsInput(dimensions) {
        await this.dimensionsInput.sendKeys(dimensions);
    }

    async getDimensionsInput() {
        return this.dimensionsInput.getAttribute('value');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setCaptionInput(caption) {
        await this.captionInput.sendKeys(caption);
    }

    async getCaptionInput() {
        return this.captionInput.getAttribute('value');
    }

    async setAltTextInput(altText) {
        await this.altTextInput.sendKeys(altText);
    }

    async getAltTextInput() {
        return this.altTextInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setUploadedByInput(uploadedBy) {
        await this.uploadedByInput.sendKeys(uploadedBy);
    }

    async getUploadedByInput() {
        return this.uploadedByInput.getAttribute('value');
    }

    async setPublishedDateInput(publishedDate) {
        await this.publishedDateInput.sendKeys(publishedDate);
    }

    async getPublishedDateInput() {
        return this.publishedDateInput.getAttribute('value');
    }

    async setPublishedDateGMTInput(publishedDateGMT) {
        await this.publishedDateGMTInput.sendKeys(publishedDateGMT);
    }

    async getPublishedDateGMTInput() {
        return this.publishedDateGMTInput.getAttribute('value');
    }

    async setLastUpdatedDateInput(lastUpdatedDate) {
        await this.lastUpdatedDateInput.sendKeys(lastUpdatedDate);
    }

    async getLastUpdatedDateInput() {
        return this.lastUpdatedDateInput.getAttribute('value');
    }

    async setLastUpdatedDateGMTInput(lastUpdatedDateGMT) {
        await this.lastUpdatedDateGMTInput.sendKeys(lastUpdatedDateGMT);
    }

    async getLastUpdatedDateGMTInput() {
        return this.lastUpdatedDateGMTInput.getAttribute('value');
    }

    async setSlugInput(slug) {
        await this.slugInput.sendKeys(slug);
    }

    async getSlugInput() {
        return this.slugInput.getAttribute('value');
    }

    async setClientIdInput(clientId) {
        await this.clientIdInput.sendKeys(clientId);
    }

    async getClientIdInput() {
        return this.clientIdInput.getAttribute('value');
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

export class MediaDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-media-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-media'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
