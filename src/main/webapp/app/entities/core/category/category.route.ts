import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Category } from 'app/shared/model/core/category.model';
import { CategoryService } from './category.service';
import { CategoryComponent } from './category.component';
import { CategoryDetailComponent } from './category-detail.component';
import { CategoryUpdateComponent } from './category-update.component';
import { ICategory } from 'app/shared/model/core/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryResolve implements Resolve<ICategory> {
    constructor(private service: CategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Category>) => response.ok),
                map((category: HttpResponse<Category>) => category.body)
            );
        }
        return of(new Category());
    }
}

export const categoryRoute: Routes = [
    {
        path: 'category',
        component: CategoryComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_ADMINISTRATOR', 'ROLE_EDITOR', 'ROLE_AUTHOR'],
            defaultSort: 'createdDate,desc',
            pageTitle: 'gatewayApp.coreCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category/:id/view',
        component: CategoryDetailComponent,
        resolve: {
            category: CategoryResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_ADMINISTRATOR', 'ROLE_EDITOR', 'ROLE_AUTHOR'],
            pageTitle: 'gatewayApp.coreCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category/new',
        component: CategoryUpdateComponent,
        resolve: {
            category: CategoryResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_ADMINISTRATOR', 'ROLE_EDITOR', 'ROLE_AUTHOR'],
            pageTitle: 'gatewayApp.coreCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category/:id/edit',
        component: CategoryUpdateComponent,
        resolve: {
            category: CategoryResolve
        },
        data: {
            authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_ADMINISTRATOR', 'ROLE_EDITOR', 'ROLE_AUTHOR'],
            pageTitle: 'gatewayApp.coreCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
