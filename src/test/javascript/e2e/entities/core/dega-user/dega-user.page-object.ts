import { element, by, ElementFinder } from 'protractor';

export class DegaUserComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-dega-user div table .btn-danger'));
    title = element.all(by.css('jhi-dega-user div h2#page-heading span')).first();

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

export class DegaUserUpdatePage {
    pageTitle = element(by.id('jhi-dega-user-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    displayNameInput = element(by.id('field_displayName'));
    websiteInput = element(by.id('field_website'));
    facebookURLInput = element(by.id('field_facebookURL'));
    twitterURLInput = element(by.id('field_twitterURL'));
    instagramURLInput = element(by.id('field_instagramURL'));
    linkedinURLInput = element(by.id('field_linkedinURL'));
    githubURLInput = element(by.id('field_githubURL'));
    profilePictureInput = element(by.id('field_profilePicture'));
    descriptionInput = element(by.id('field_description'));
    slugInput = element(by.id('field_slug'));
    enabledInput = element(by.id('field_enabled'));
    emailVerifiedInput = element(by.id('field_emailVerified'));
    emailInput = element(by.id('field_email'));
    createdDateInput = element(by.id('field_createdDate'));
    roleSelect = element(by.id('field_role'));
    organizationSelect = element(by.id('field_organization'));
    organizationDefaultSelect = element(by.id('field_organizationDefault'));
    organizationCurrentSelect = element(by.id('field_organizationCurrent'));
    roleMappingSelect = element(by.id('field_roleMapping'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setDisplayNameInput(displayName) {
        await this.displayNameInput.sendKeys(displayName);
    }

    async getDisplayNameInput() {
        return this.displayNameInput.getAttribute('value');
    }

    async setWebsiteInput(website) {
        await this.websiteInput.sendKeys(website);
    }

    async getWebsiteInput() {
        return this.websiteInput.getAttribute('value');
    }

    async setFacebookURLInput(facebookURL) {
        await this.facebookURLInput.sendKeys(facebookURL);
    }

    async getFacebookURLInput() {
        return this.facebookURLInput.getAttribute('value');
    }

    async setTwitterURLInput(twitterURL) {
        await this.twitterURLInput.sendKeys(twitterURL);
    }

    async getTwitterURLInput() {
        return this.twitterURLInput.getAttribute('value');
    }

    async setInstagramURLInput(instagramURL) {
        await this.instagramURLInput.sendKeys(instagramURL);
    }

    async getInstagramURLInput() {
        return this.instagramURLInput.getAttribute('value');
    }

    async setLinkedinURLInput(linkedinURL) {
        await this.linkedinURLInput.sendKeys(linkedinURL);
    }

    async getLinkedinURLInput() {
        return this.linkedinURLInput.getAttribute('value');
    }

    async setGithubURLInput(githubURL) {
        await this.githubURLInput.sendKeys(githubURL);
    }

    async getGithubURLInput() {
        return this.githubURLInput.getAttribute('value');
    }

    async setProfilePictureInput(profilePicture) {
        await this.profilePictureInput.sendKeys(profilePicture);
    }

    async getProfilePictureInput() {
        return this.profilePictureInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setSlugInput(slug) {
        await this.slugInput.sendKeys(slug);
    }

    async getSlugInput() {
        return this.slugInput.getAttribute('value');
    }

    getEnabledInput() {
        return this.enabledInput;
    }
    getEmailVerifiedInput() {
        return this.emailVerifiedInput;
    }
    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setCreatedDateInput(createdDate) {
        await this.createdDateInput.sendKeys(createdDate);
    }

    async getCreatedDateInput() {
        return this.createdDateInput.getAttribute('value');
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

    async organizationDefaultSelectLastOption() {
        await this.organizationDefaultSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async organizationDefaultSelectOption(option) {
        await this.organizationDefaultSelect.sendKeys(option);
    }

    getOrganizationDefaultSelect(): ElementFinder {
        return this.organizationDefaultSelect;
    }

    async getOrganizationDefaultSelectedOption() {
        return this.organizationDefaultSelect.element(by.css('option:checked')).getText();
    }

    async organizationCurrentSelectLastOption() {
        await this.organizationCurrentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async organizationCurrentSelectOption(option) {
        await this.organizationCurrentSelect.sendKeys(option);
    }

    getOrganizationCurrentSelect(): ElementFinder {
        return this.organizationCurrentSelect;
    }

    async getOrganizationCurrentSelectedOption() {
        return this.organizationCurrentSelect.element(by.css('option:checked')).getText();
    }

    async roleMappingSelectLastOption() {
        await this.roleMappingSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async roleMappingSelectOption(option) {
        await this.roleMappingSelect.sendKeys(option);
    }

    getRoleMappingSelect(): ElementFinder {
        return this.roleMappingSelect;
    }

    async getRoleMappingSelectedOption() {
        return this.roleMappingSelect.element(by.css('option:checked')).getText();
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

export class DegaUserDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-degaUser-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-degaUser'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
