import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Lieu } from 'app/shared/model/lieu.model';
import { LieuService } from './lieu.service';
import { LieuComponent } from './lieu.component';
import { LieuDetailComponent } from './lieu-detail.component';
import { LieuUpdateComponent } from './lieu-update.component';
import { LieuDeletePopupComponent } from './lieu-delete-dialog.component';
import { ILieu } from 'app/shared/model/lieu.model';

@Injectable({ providedIn: 'root' })
export class LieuResolve implements Resolve<ILieu> {
    constructor(private service: LieuService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lieu> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Lieu>) => response.ok),
                map((lieu: HttpResponse<Lieu>) => lieu.body)
            );
        }
        return of(new Lieu());
    }
}

export const lieuRoute: Routes = [
    {
        path: 'lieu',
        component: LieuComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEvenementApp.lieu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lieu/:id/view',
        component: LieuDetailComponent,
        resolve: {
            lieu: LieuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.lieu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lieu/new',
        component: LieuUpdateComponent,
        resolve: {
            lieu: LieuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.lieu.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'lieu/:id/edit',
        component: LieuUpdateComponent,
        resolve: {
            lieu: LieuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.lieu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lieuPopupRoute: Routes = [
    {
        path: 'lieu/:id/delete',
        component: LieuDeletePopupComponent,
        resolve: {
            lieu: LieuResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.lieu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
