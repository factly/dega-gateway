/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PostService } from 'app/entities/core/post/post.service';
import { IPost, Post } from 'app/shared/model/core/post.model';

describe('Service Tests', () => {
    describe('Post Service', () => {
        let injector: TestBed;
        let service: PostService;
        let httpMock: HttpTestingController;
        let elemDefault: IPost;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PostService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Post(
                'ID',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                currentDate,
                currentDate,
                currentDate,
                false,
                false,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        publishedDate: currentDate.format(DATE_TIME_FORMAT),
                        publishedDateGMT: currentDate.format(DATE_TIME_FORMAT),
                        lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT),
                        lastUpdatedDateGMT: currentDate.format(DATE_TIME_FORMAT)
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

            it('should create a Post', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID',
                        publishedDate: currentDate.format(DATE_TIME_FORMAT),
                        publishedDateGMT: currentDate.format(DATE_TIME_FORMAT),
                        lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT),
                        lastUpdatedDateGMT: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        publishedDate: currentDate,
                        publishedDateGMT: currentDate,
                        lastUpdatedDate: currentDate,
                        lastUpdatedDateGMT: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Post(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Post', async () => {
                const returnedFromService = Object.assign(
                    {
                        title: 'BBBBBB',
                        clientId: 'BBBBBB',
                        content: 'BBBBBB',
                        excerpt: 'BBBBBB',
                        publishedDate: currentDate.format(DATE_TIME_FORMAT),
                        publishedDateGMT: currentDate.format(DATE_TIME_FORMAT),
                        lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT),
                        lastUpdatedDateGMT: currentDate.format(DATE_TIME_FORMAT),
                        featured: true,
                        sticky: true,
                        updates: 'BBBBBB',
                        slug: 'BBBBBB',
                        password: 'BBBBBB',
                        featuredMedia: 'BBBBBB',
                        subTitle: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        publishedDate: currentDate,
                        publishedDateGMT: currentDate,
                        lastUpdatedDate: currentDate,
                        lastUpdatedDateGMT: currentDate
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

            it('should return a list of Post', async () => {
                const returnedFromService = Object.assign(
                    {
                        title: 'BBBBBB',
                        clientId: 'BBBBBB',
                        content: 'BBBBBB',
                        excerpt: 'BBBBBB',
                        publishedDate: currentDate.format(DATE_TIME_FORMAT),
                        publishedDateGMT: currentDate.format(DATE_TIME_FORMAT),
                        lastUpdatedDate: currentDate.format(DATE_TIME_FORMAT),
                        lastUpdatedDateGMT: currentDate.format(DATE_TIME_FORMAT),
                        featured: true,
                        sticky: true,
                        updates: 'BBBBBB',
                        slug: 'BBBBBB',
                        password: 'BBBBBB',
                        featuredMedia: 'BBBBBB',
                        subTitle: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        publishedDate: currentDate,
                        publishedDateGMT: currentDate,
                        lastUpdatedDate: currentDate,
                        lastUpdatedDateGMT: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(take(1), map(resp => resp.body))
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Post', async () => {
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
