import { element, by, ElementFinder } from 'protractor';

export class ClaimComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-claim div table .btn-danger'));
    title = element.all(by.css('jhi-claim div h2#page-heading span')).first();

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

export class ClaimUpdatePage {
    pageTitle = element(by.id('jhi-claim-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    claimInput = element(by.id('field_claim'));
    descriptionInput = element(by.id('field_description'));
    claimDateInput = element(by.id('field_claimDate'));
    claimSourceInput = element(by.id('field_claimSource'));
    checkedDateInput = element(by.id('field_checkedDate'));
    reviewSourcesInput = element(by.id('field_reviewSources'));
    reviewInput = element(by.id('field_review'));
    reviewTagLineInput = element(by.id('field_reviewTagLine'));
    clientIdInput = element(by.id('field_clientId'));
    claimantSelect = element(by.id('field_claimant'));
    ratingSelect = element(by.id('field_rating'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setClaimInput(claim) {
        await this.claimInput.sendKeys(claim);
    }

    async getClaimInput() {
        return this.claimInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setClaimDateInput(claimDate) {
        await this.claimDateInput.sendKeys(claimDate);
    }

    async getClaimDateInput() {
        return this.claimDateInput.getAttribute('value');
    }

    async setClaimSourceInput(claimSource) {
        await this.claimSourceInput.sendKeys(claimSource);
    }

    async getClaimSourceInput() {
        return this.claimSourceInput.getAttribute('value');
    }

    async setCheckedDateInput(checkedDate) {
        await this.checkedDateInput.sendKeys(checkedDate);
    }

    async getCheckedDateInput() {
        return this.checkedDateInput.getAttribute('value');
    }

    async setReviewSourcesInput(reviewSources) {
        await this.reviewSourcesInput.sendKeys(reviewSources);
    }

    async getReviewSourcesInput() {
        return this.reviewSourcesInput.getAttribute('value');
    }

    async setReviewInput(review) {
        await this.reviewInput.sendKeys(review);
    }

    async getReviewInput() {
        return this.reviewInput.getAttribute('value');
    }

    async setReviewTagLineInput(reviewTagLine) {
        await this.reviewTagLineInput.sendKeys(reviewTagLine);
    }

    async getReviewTagLineInput() {
        return this.reviewTagLineInput.getAttribute('value');
    }

    async setClientIdInput(clientId) {
        await this.clientIdInput.sendKeys(clientId);
    }

    async getClientIdInput() {
        return this.clientIdInput.getAttribute('value');
    }

    async claimantSelectLastOption() {
        await this.claimantSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async claimantSelectOption(option) {
        await this.claimantSelect.sendKeys(option);
    }

    getClaimantSelect(): ElementFinder {
        return this.claimantSelect;
    }

    async getClaimantSelectedOption() {
        return this.claimantSelect.element(by.css('option:checked')).getText();
    }

    async ratingSelectLastOption() {
        await this.ratingSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async ratingSelectOption(option) {
        await this.ratingSelect.sendKeys(option);
    }

    getRatingSelect(): ElementFinder {
        return this.ratingSelect;
    }

    async getRatingSelectedOption() {
        return this.ratingSelect.element(by.css('option:checked')).getText();
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

export class ClaimDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-claim-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-claim'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
