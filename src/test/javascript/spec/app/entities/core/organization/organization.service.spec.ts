/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { OrganizationService } from 'app/entities/core/organization/organization.service';
import { IOrganization, Organization } from 'app/shared/model/core/organization.model';

describe('Service Tests', () => {
    describe('Organization Service', () => {
        let injector: TestBed;
        let service: OrganizationService;
        let httpMock: HttpTestingController;
        let elemDefault: IOrganization;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(OrganizationService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new Organization(
                'ID',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find('123')
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Organization', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new Organization(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Organization', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        phone: 'BBBBBB',
                        siteTitle: 'BBBBBB',
                        tagLine: 'BBBBBB',
                        description: 'BBBBBB',
                        logoURL: 'BBBBBB',
                        logoURLMobile: 'BBBBBB',
                        favIconURL: 'BBBBBB',
                        mobileIconURL: 'BBBBBB',
                        baiduVerificationCode: 'BBBBBB',
                        bingVerificationCode: 'BBBBBB',
                        googleVerificationCode: 'BBBBBB',
                        yandexVerificationCode: 'BBBBBB',
                        facebookURL: 'BBBBBB',
                        twitterURL: 'BBBBBB',
                        instagramURL: 'BBBBBB',
                        linkedInURL: 'BBBBBB',
                        pinterestURL: 'BBBBBB',
                        youTubeURL: 'BBBBBB',
                        googlePlusURL: 'BBBBBB',
                        githubURL: 'BBBBBB',
                        facebookPageAccessToken: 'BBBBBB',
                        gaTrackingCode: 'BBBBBB',
                        githubClientId: 'BBBBBB',
                        githubClientSecret: 'BBBBBB',
                        twitterClientId: 'BBBBBB',
                        twitterClientSecret: 'BBBBBB',
                        facebookClientId: 'BBBBBB',
                        facebookClientSecret: 'BBBBBB',
                        googleClientId: 'BBBBBB',
                        googleClientSecret: 'BBBBBB',
                        linkedInClientId: 'BBBBBB',
                        linkedInClientSecret: 'BBBBBB',
                        instagramClientId: 'BBBBBB',
                        instagramClientSecret: 'BBBBBB',
                        mailchimpAPIKey: 'BBBBBB',
                        siteLanguage: 'BBBBBB',
                        timeZone: 'BBBBBB',
                        clientId: 'BBBBBB',
                        slug: 'BBBBBB',
                        email: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Organization', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        phone: 'BBBBBB',
                        siteTitle: 'BBBBBB',
                        tagLine: 'BBBBBB',
                        description: 'BBBBBB',
                        logoURL: 'BBBBBB',
                        logoURLMobile: 'BBBBBB',
                        favIconURL: 'BBBBBB',
                        mobileIconURL: 'BBBBBB',
                        baiduVerificationCode: 'BBBBBB',
                        bingVerificationCode: 'BBBBBB',
                        googleVerificationCode: 'BBBBBB',
                        yandexVerificationCode: 'BBBBBB',
                        facebookURL: 'BBBBBB',
                        twitterURL: 'BBBBBB',
                        instagramURL: 'BBBBBB',
                        linkedInURL: 'BBBBBB',
                        pinterestURL: 'BBBBBB',
                        youTubeURL: 'BBBBBB',
                        googlePlusURL: 'BBBBBB',
                        githubURL: 'BBBBBB',
                        facebookPageAccessToken: 'BBBBBB',
                        gaTrackingCode: 'BBBBBB',
                        githubClientId: 'BBBBBB',
                        githubClientSecret: 'BBBBBB',
                        twitterClientId: 'BBBBBB',
                        twitterClientSecret: 'BBBBBB',
                        facebookClientId: 'BBBBBB',
                        facebookClientSecret: 'BBBBBB',
                        googleClientId: 'BBBBBB',
                        googleClientSecret: 'BBBBBB',
                        linkedInClientId: 'BBBBBB',
                        linkedInClientSecret: 'BBBBBB',
                        instagramClientId: 'BBBBBB',
                        instagramClientSecret: 'BBBBBB',
                        mailchimpAPIKey: 'BBBBBB',
                        siteLanguage: 'BBBBBB',
                        timeZone: 'BBBBBB',
                        clientId: 'BBBBBB',
                        slug: 'BBBBBB',
                        email: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Organization', async () => {
                const rxPromise = service.delete('123').subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
