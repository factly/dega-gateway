import { element, by, ElementFinder } from 'protractor';

export class OrganizationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-organization div table .btn-danger'));
    title = element.all(by.css('jhi-organization div h2#page-heading span')).first();

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

export class OrganizationUpdatePage {
    pageTitle = element(by.id('jhi-organization-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    phoneInput = element(by.id('field_phone'));
    siteTitleInput = element(by.id('field_siteTitle'));
    tagLineInput = element(by.id('field_tagLine'));
    descriptionInput = element(by.id('field_description'));
    logoURLInput = element(by.id('field_logoURL'));
    logoURLMobileInput = element(by.id('field_logoURLMobile'));
    favIconURLInput = element(by.id('field_favIconURL'));
    mobileIconURLInput = element(by.id('field_mobileIconURL'));
    baiduVerificationCodeInput = element(by.id('field_baiduVerificationCode'));
    bingVerificationCodeInput = element(by.id('field_bingVerificationCode'));
    googleVerificationCodeInput = element(by.id('field_googleVerificationCode'));
    yandexVerificationCodeInput = element(by.id('field_yandexVerificationCode'));
    facebookURLInput = element(by.id('field_facebookURL'));
    twitterURLInput = element(by.id('field_twitterURL'));
    instagramURLInput = element(by.id('field_instagramURL'));
    linkedInURLInput = element(by.id('field_linkedInURL'));
    pinterestURLInput = element(by.id('field_pinterestURL'));
    youTubeURLInput = element(by.id('field_youTubeURL'));
    googlePlusURLInput = element(by.id('field_googlePlusURL'));
    githubURLInput = element(by.id('field_githubURL'));
    facebookPageAccessTokenInput = element(by.id('field_facebookPageAccessToken'));
    gaTrackingCodeInput = element(by.id('field_gaTrackingCode'));
    githubClientIdInput = element(by.id('field_githubClientId'));
    githubClientSecretInput = element(by.id('field_githubClientSecret'));
    twitterClientIdInput = element(by.id('field_twitterClientId'));
    twitterClientSecretInput = element(by.id('field_twitterClientSecret'));
    facebookClientIdInput = element(by.id('field_facebookClientId'));
    facebookClientSecretInput = element(by.id('field_facebookClientSecret'));
    googleClientIdInput = element(by.id('field_googleClientId'));
    googleClientSecretInput = element(by.id('field_googleClientSecret'));
    linkedInClientIdInput = element(by.id('field_linkedInClientId'));
    linkedInClientSecretInput = element(by.id('field_linkedInClientSecret'));
    instagramClientIdInput = element(by.id('field_instagramClientId'));
    instagramClientSecretInput = element(by.id('field_instagramClientSecret'));
    mailchimpAPIKeyInput = element(by.id('field_mailchimpAPIKey'));
    siteLanguageInput = element(by.id('field_siteLanguage'));
    timeZoneInput = element(by.id('field_timeZone'));
    clientIdInput = element(by.id('field_clientId'));
    slugInput = element(by.id('field_slug'));
    emailInput = element(by.id('field_email'));
    createdDateInput = element(by.id('field_createdDate'));
    lastUpdatedDateInput = element(by.id('field_lastUpdatedDate'));
    siteAddressInput = element(by.id('field_siteAddress'));
    enableFactcheckingInput = element(by.id('field_enableFactchecking'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setPhoneInput(phone) {
        await this.phoneInput.sendKeys(phone);
    }

    async getPhoneInput() {
        return this.phoneInput.getAttribute('value');
    }

    async setSiteTitleInput(siteTitle) {
        await this.siteTitleInput.sendKeys(siteTitle);
    }

    async getSiteTitleInput() {
        return this.siteTitleInput.getAttribute('value');
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

    async setLogoURLInput(logoURL) {
        await this.logoURLInput.sendKeys(logoURL);
    }

    async getLogoURLInput() {
        return this.logoURLInput.getAttribute('value');
    }

    async setLogoURLMobileInput(logoURLMobile) {
        await this.logoURLMobileInput.sendKeys(logoURLMobile);
    }

    async getLogoURLMobileInput() {
        return this.logoURLMobileInput.getAttribute('value');
    }

    async setFavIconURLInput(favIconURL) {
        await this.favIconURLInput.sendKeys(favIconURL);
    }

    async getFavIconURLInput() {
        return this.favIconURLInput.getAttribute('value');
    }

    async setMobileIconURLInput(mobileIconURL) {
        await this.mobileIconURLInput.sendKeys(mobileIconURL);
    }

    async getMobileIconURLInput() {
        return this.mobileIconURLInput.getAttribute('value');
    }

    async setBaiduVerificationCodeInput(baiduVerificationCode) {
        await this.baiduVerificationCodeInput.sendKeys(baiduVerificationCode);
    }

    async getBaiduVerificationCodeInput() {
        return this.baiduVerificationCodeInput.getAttribute('value');
    }

    async setBingVerificationCodeInput(bingVerificationCode) {
        await this.bingVerificationCodeInput.sendKeys(bingVerificationCode);
    }

    async getBingVerificationCodeInput() {
        return this.bingVerificationCodeInput.getAttribute('value');
    }

    async setGoogleVerificationCodeInput(googleVerificationCode) {
        await this.googleVerificationCodeInput.sendKeys(googleVerificationCode);
    }

    async getGoogleVerificationCodeInput() {
        return this.googleVerificationCodeInput.getAttribute('value');
    }

    async setYandexVerificationCodeInput(yandexVerificationCode) {
        await this.yandexVerificationCodeInput.sendKeys(yandexVerificationCode);
    }

    async getYandexVerificationCodeInput() {
        return this.yandexVerificationCodeInput.getAttribute('value');
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

    async setLinkedInURLInput(linkedInURL) {
        await this.linkedInURLInput.sendKeys(linkedInURL);
    }

    async getLinkedInURLInput() {
        return this.linkedInURLInput.getAttribute('value');
    }

    async setPinterestURLInput(pinterestURL) {
        await this.pinterestURLInput.sendKeys(pinterestURL);
    }

    async getPinterestURLInput() {
        return this.pinterestURLInput.getAttribute('value');
    }

    async setYouTubeURLInput(youTubeURL) {
        await this.youTubeURLInput.sendKeys(youTubeURL);
    }

    async getYouTubeURLInput() {
        return this.youTubeURLInput.getAttribute('value');
    }

    async setGooglePlusURLInput(googlePlusURL) {
        await this.googlePlusURLInput.sendKeys(googlePlusURL);
    }

    async getGooglePlusURLInput() {
        return this.googlePlusURLInput.getAttribute('value');
    }

    async setGithubURLInput(githubURL) {
        await this.githubURLInput.sendKeys(githubURL);
    }

    async getGithubURLInput() {
        return this.githubURLInput.getAttribute('value');
    }

    async setFacebookPageAccessTokenInput(facebookPageAccessToken) {
        await this.facebookPageAccessTokenInput.sendKeys(facebookPageAccessToken);
    }

    async getFacebookPageAccessTokenInput() {
        return this.facebookPageAccessTokenInput.getAttribute('value');
    }

    async setGaTrackingCodeInput(gaTrackingCode) {
        await this.gaTrackingCodeInput.sendKeys(gaTrackingCode);
    }

    async getGaTrackingCodeInput() {
        return this.gaTrackingCodeInput.getAttribute('value');
    }

    async setGithubClientIdInput(githubClientId) {
        await this.githubClientIdInput.sendKeys(githubClientId);
    }

    async getGithubClientIdInput() {
        return this.githubClientIdInput.getAttribute('value');
    }

    async setGithubClientSecretInput(githubClientSecret) {
        await this.githubClientSecretInput.sendKeys(githubClientSecret);
    }

    async getGithubClientSecretInput() {
        return this.githubClientSecretInput.getAttribute('value');
    }

    async setTwitterClientIdInput(twitterClientId) {
        await this.twitterClientIdInput.sendKeys(twitterClientId);
    }

    async getTwitterClientIdInput() {
        return this.twitterClientIdInput.getAttribute('value');
    }

    async setTwitterClientSecretInput(twitterClientSecret) {
        await this.twitterClientSecretInput.sendKeys(twitterClientSecret);
    }

    async getTwitterClientSecretInput() {
        return this.twitterClientSecretInput.getAttribute('value');
    }

    async setFacebookClientIdInput(facebookClientId) {
        await this.facebookClientIdInput.sendKeys(facebookClientId);
    }

    async getFacebookClientIdInput() {
        return this.facebookClientIdInput.getAttribute('value');
    }

    async setFacebookClientSecretInput(facebookClientSecret) {
        await this.facebookClientSecretInput.sendKeys(facebookClientSecret);
    }

    async getFacebookClientSecretInput() {
        return this.facebookClientSecretInput.getAttribute('value');
    }

    async setGoogleClientIdInput(googleClientId) {
        await this.googleClientIdInput.sendKeys(googleClientId);
    }

    async getGoogleClientIdInput() {
        return this.googleClientIdInput.getAttribute('value');
    }

    async setGoogleClientSecretInput(googleClientSecret) {
        await this.googleClientSecretInput.sendKeys(googleClientSecret);
    }

    async getGoogleClientSecretInput() {
        return this.googleClientSecretInput.getAttribute('value');
    }

    async setLinkedInClientIdInput(linkedInClientId) {
        await this.linkedInClientIdInput.sendKeys(linkedInClientId);
    }

    async getLinkedInClientIdInput() {
        return this.linkedInClientIdInput.getAttribute('value');
    }

    async setLinkedInClientSecretInput(linkedInClientSecret) {
        await this.linkedInClientSecretInput.sendKeys(linkedInClientSecret);
    }

    async getLinkedInClientSecretInput() {
        return this.linkedInClientSecretInput.getAttribute('value');
    }

    async setInstagramClientIdInput(instagramClientId) {
        await this.instagramClientIdInput.sendKeys(instagramClientId);
    }

    async getInstagramClientIdInput() {
        return this.instagramClientIdInput.getAttribute('value');
    }

    async setInstagramClientSecretInput(instagramClientSecret) {
        await this.instagramClientSecretInput.sendKeys(instagramClientSecret);
    }

    async getInstagramClientSecretInput() {
        return this.instagramClientSecretInput.getAttribute('value');
    }

    async setMailchimpAPIKeyInput(mailchimpAPIKey) {
        await this.mailchimpAPIKeyInput.sendKeys(mailchimpAPIKey);
    }

    async getMailchimpAPIKeyInput() {
        return this.mailchimpAPIKeyInput.getAttribute('value');
    }

    async setSiteLanguageInput(siteLanguage) {
        await this.siteLanguageInput.sendKeys(siteLanguage);
    }

    async getSiteLanguageInput() {
        return this.siteLanguageInput.getAttribute('value');
    }

    async setTimeZoneInput(timeZone) {
        await this.timeZoneInput.sendKeys(timeZone);
    }

    async getTimeZoneInput() {
        return this.timeZoneInput.getAttribute('value');
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

    async setLastUpdatedDateInput(lastUpdatedDate) {
        await this.lastUpdatedDateInput.sendKeys(lastUpdatedDate);
    }

    async getLastUpdatedDateInput() {
        return this.lastUpdatedDateInput.getAttribute('value');
    }

    async setSiteAddressInput(siteAddress) {
        await this.siteAddressInput.sendKeys(siteAddress);
    }

    async getSiteAddressInput() {
        return this.siteAddressInput.getAttribute('value');
    }

    getEnableFactcheckingInput() {
        return this.enableFactcheckingInput;
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

export class OrganizationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-organization-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-organization'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
