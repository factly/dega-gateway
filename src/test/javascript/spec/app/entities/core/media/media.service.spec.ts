/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MediaService } from 'app/entities/core/media/media.service';
import { IMedia, Media } from 'app/shared/model/core/media.model';

describe('Service Tests', () => {
    describe('Media Service', () => {
        let injector: TestBed;
        let service: MediaService;
        let httpMock: HttpTestingController;
        let elemDefault: IMedia;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(MediaService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Media(
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
                currentDate,
                currentDate,
                'AAAAAAA',
                'AAAAAAA',
                currentDate
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        publishedDate: currentDate.format(DATE_TIME_FORMAT),
                        lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT),
                        createdDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find('123')
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Media', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID',
                        publishedDate: currentDate.format(DATE_TIME_FORMAT),
                        lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT),
                        createdDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        publishedDate: currentDate,
                        lastUpdatedDate: currentDate,
                        createdDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Media(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Media', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        type: 'BBBBBB',
                        url: 'BBBBBB',
                        fileSize: 'BBBBBB',
                        dimensions: 'BBBBBB',
                        title: 'BBBBBB',
                        caption: 'BBBBBB',
                        altText: 'BBBBBB',
                        description: 'BBBBBB',
                        uploadedBy: 'BBBBBB',
                        publishedDate: currentDate.format(DATE_TIME_FORMAT),
                        lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT),
                        slug: 'BBBBBB',
                        createdDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        publishedDate: currentDate,
                        lastUpdatedDate: currentDate,
                        createdDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Media', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        type: 'BBBBBB',
                        url: 'BBBBBB',
                        fileSize: 'BBBBBB',
                        dimensions: 'BBBBBB',
                        title: 'BBBBBB',
                        caption: 'BBBBBB',
                        altText: 'BBBBBB',
                        description: 'BBBBBB',
                        uploadedBy: 'BBBBBB',
                        publishedDate: currentDate.format(DATE_TIME_FORMAT),
                        lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT),
                        slug: 'BBBBBB',
                        createdDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        publishedDate: currentDate,
                        lastUpdatedDate: currentDate,
                        createdDate: currentDate
                    },
                    returnedFromService
                );
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

            it('should delete a Media', async () => {
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
