import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';

import { Observable } from 'rxjs/index';

import { VERSION } from 'app/app.constants';
import { JhiLanguageHelper, LoginService, Principal } from 'app/core';
import { ProfileService } from '../profiles/profile.service';
import { DegaUserService } from 'app/entities/core/dega-user/dega-user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IDegaUser } from 'app/shared/model/core/dega-user.model';
import { IOrganization } from 'app/shared/model/core/organization.model';
import { OrganizationService } from 'app/entities/core/organization/organization.service';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    version: string;
    organisationOptions: IOrganization[];
    currentUser: IDegaUser;

    constructor(
        private jhiAlertService: JhiAlertService,
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private sessionStorage: SessionStorageService,
        private degaUserService: DegaUserService,
        private organizationService: OrganizationService,
        private principal: Principal,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });
        this.principal.identity().then(account => {
            if (account) {
                this.organizationService.getOrganizationsByKeycloakId(account.id).subscribe(
                    (res: HttpResponse<IOrganization[]>) => {
                        this.organisationOptions = res.body;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            }
        });

        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    changeOrganisation(selectedOrganisation: IOrganization) {
        this.currentUser.organizationCurrentId = selectedOrganisation.id;
        this.subscribeToSaveResponse(this.degaUserService.update(this.currentUser));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDegaUser>>) {
        result.subscribe((res: HttpResponse<IDegaUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onError(res.message));
    }

    private onSaveSuccess() {
        window.location.reload();
    }

    changeLanguage(languageKey: string) {
        this.sessionStorage.store('locale', languageKey);
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.loginService.login();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
        console.log(errorMessage);
    }
}
