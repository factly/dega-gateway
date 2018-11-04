import { element, by, ElementFinder } from 'protractor';

export class PostComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-post div table .btn-danger'));
    title = element.all(by.css('jhi-post div h2#page-heading span')).first();

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

export class PostUpdatePage {
    pageTitle = element(by.id('jhi-post-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    clientIdInput = element(by.id('field_clientId'));
    contentInput = element(by.id('field_content'));
    excerptInput = element(by.id('field_excerpt'));
    publishedDateInput = element(by.id('field_publishedDate'));
    publishedDateGMTInput = element(by.id('field_publishedDateGMT'));
    lastUpdatedDateInput = element(by.id('field_lastUpdatedDate'));
    lastUpdatedDateGMTInput = element(by.id('field_lastUpdatedDateGMT'));
    featuredInput = element(by.id('field_featured'));
    stickyInput = element(by.id('field_sticky'));
    updatesInput = element(by.id('field_updates'));
    slugInput = element(by.id('field_slug'));
    passwordInput = element(by.id('field_password'));
    featuredMediaInput = element(by.id('field_featuredMedia'));
    subTitleInput = element(by.id('field_subTitle'));
    tagSelect = element(by.id('field_tag'));
    categorySelect = element(by.id('field_category'));
    statusSelect = element(by.id('field_status'));
    formatSelect = element(by.id('field_format'));

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

    async setContentInput(content) {
        await this.contentInput.sendKeys(content);
    }

    async getContentInput() {
        return this.contentInput.getAttribute('value');
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

    async tagSelectLastOption() {
        await this.tagSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async tagSelectOption(option) {
        await this.tagSelect.sendKeys(option);
    }

    getTagSelect(): ElementFinder {
        return this.tagSelect;
    }

    async getTagSelectedOption() {
        return this.tagSelect.element(by.css('option:checked')).getText();
    }

    async categorySelectLastOption() {
        await this.categorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async categorySelectOption(option) {
        await this.categorySelect.sendKeys(option);
    }

    getCategorySelect(): ElementFinder {
        return this.categorySelect;
    }

    async getCategorySelectedOption() {
        return this.categorySelect.element(by.css('option:checked')).getText();
    }

    async statusSelectLastOption() {
        await this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async statusSelectOption(option) {
        await this.statusSelect.sendKeys(option);
    }

    getStatusSelect(): ElementFinder {
        return this.statusSelect;
    }

    async getStatusSelectedOption() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    async formatSelectLastOption() {
        await this.formatSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async formatSelectOption(option) {
        await this.formatSelect.sendKeys(option);
    }

    getFormatSelect(): ElementFinder {
        return this.formatSelect;
    }

    async getFormatSelectedOption() {
        return this.formatSelect.element(by.css('option:checked')).getText();
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

export class PostDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-post-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-post'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
