/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { DegaUserService } from 'app/entities/core/dega-user/dega-user.service';
import { IDegaUser, DegaUser } from 'app/shared/model/core/dega-user.model';

describe('Service Tests', () => {
    describe('DegaUser Service', () => {
        let injector: TestBed;
        let service: DegaUserService;
        let httpMock: HttpTestingController;
        let elemDefault: IDegaUser;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DegaUserService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new DegaUser(
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
                false,
                false,
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

            it('should create a DegaUser', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new DegaUser(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a DegaUser', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        displayName: 'BBBBBB',
                        website: 'BBBBBB',
                        facebookURL: 'BBBBBB',
                        twitterURL: 'BBBBBB',
                        instagramURL: 'BBBBBB',
                        linkedinURL: 'BBBBBB',
                        githubURL: 'BBBBBB',
                        profilePicture: 'BBBBBB',
                        description: 'BBBBBB',
                        slug: 'BBBBBB',
                        enabled: true,
                        emailVerified: true,
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

            it('should return a list of DegaUser', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        displayName: 'BBBBBB',
                        website: 'BBBBBB',
                        facebookURL: 'BBBBBB',
                        twitterURL: 'BBBBBB',
                        instagramURL: 'BBBBBB',
                        linkedinURL: 'BBBBBB',
                        githubURL: 'BBBBBB',
                        profilePicture: 'BBBBBB',
                        description: 'BBBBBB',
                        slug: 'BBBBBB',
                        enabled: true,
                        emailVerified: true,
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

            it('should delete a DegaUser', async () => {
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
