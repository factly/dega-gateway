import { element, by, ElementFinder } from 'protractor';

export class FactcheckComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-factcheck div table .btn-danger'));
    title = element.all(by.css('jhi-factcheck div h2#page-heading span')).first();

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

export class FactcheckUpdatePage {
    pageTitle = element(by.id('jhi-factcheck-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    clientIdInput = element(by.id('field_clientId'));
    introductionInput = element(by.id('field_introduction'));
    summaryInput = element(by.id('field_summary'));
    excerptInput = element(by.id('field_excerpt'));
    publishedDateInput = element(by.id('field_publishedDate'));
    lastUpdatedDateInput = element(by.id('field_lastUpdatedDate'));
    featuredInput = element(by.id('field_featured'));
    stickyInput = element(by.id('field_sticky'));
    updatesInput = element(by.id('field_updates'));
    slugInput = element(by.id('field_slug'));
    passwordInput = element(by.id('field_password'));
    featuredMediaInput = element(by.id('field_featuredMedia'));
    subTitleInput = element(by.id('field_subTitle'));
    createdDateInput = element(by.id('field_createdDate'));
    claimSelect = element(by.id('field_claim'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setClientIdInput(clientId) {
        await this.clientIdInput.sendKeys(clientId);
    }

    async getClientIdInput() {
        return this.clientIdInput.getAttribute('value');
    }

    async setIntroductionInput(introduction) {
        await this.introductionInput.sendKeys(introduction);
    }

    async getIntroductionInput() {
        return this.introductionInput.getAttribute('value');
    }

    async setSummaryInput(summary) {
        await this.summaryInput.sendKeys(summary);
    }

    async getSummaryInput() {
        return this.summaryInput.getAttribute('value');
    }

    async setExcerptInput(excerpt) {
        await this.excerptInput.sendKeys(excerpt);
    }

    async getExcerptInput() {
        return this.excerptInput.getAttribute('value');
    }

    async setPublishedDateInput(publishedDate) {
        await this.publishedDateInput.sendKeys(publishedDate);
    }

    async getPublishedDateInput() {
        return this.publishedDateInput.getAttribute('value');
    }

    async setLastUpdatedDateInput(lastUpdatedDate) {
        await this.lastUpdatedDateInput.sendKeys(lastUpdatedDate);
    }

    async getLastUpdatedDateInput() {
        return this.lastUpdatedDateInput.getAttribute('value');
    }

    getFeaturedInput() {
        return this.featuredInput;
    }
    getStickyInput() {
        return this.stickyInput;
    }
    async setUpdatesInput(updates) {
        await this.updatesInput.sendKeys(updates);
    }

    async getUpdatesInput() {
        return this.updatesInput.getAttribute('value');
    }

    async setSlugInput(slug) {
        await this.slugInput.sendKeys(slug);
    }

    async getSlugInput() {
        return this.slugInput.getAttribute('value');
    }

    async setPasswordInput(password) {
        await this.passwordInput.sendKeys(password);
    }

    async getPasswordInput() {
        return this.passwordInput.getAttribute('value');
    }

    async setFeaturedMediaInput(featuredMedia) {
        await this.featuredMediaInput.sendKeys(featuredMedia);
    }

    async getFeaturedMediaInput() {
        return this.featuredMediaInput.getAttribute('value');
    }

    async setSubTitleInput(subTitle) {
        await this.subTitleInput.sendKeys(subTitle);
    }

    async getSubTitleInput() {
        return this.subTitleInput.getAttribute('value');
    }

    async setCreatedDateInput(createdDate) {
        await this.createdDateInput.sendKeys(createdDate);
    }

    async getCreatedDateInput() {
        return this.createdDateInput.getAttribute('value');
    }

    async claimSelectLastOption() {
        await this.claimSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async claimSelectOption(option) {
        await this.claimSelect.sendKeys(option);
    }

    getClaimSelect(): ElementFinder {
        return this.claimSelect;
    }

    async getClaimSelectedOption() {
        return this.claimSelect.element(by.css('option:checked')).getText();
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

export class FactcheckDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-factcheck-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-factcheck'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
