import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Membre } from 'app/shared/model/membre.model';
import { MembreService } from './membre.service';
import { MembreComponent } from './membre.component';
import { MembreDetailComponent } from './membre-detail.component';
import { MembreUpdateComponent } from './membre-update.component';
import { MembreDeletePopupComponent } from './membre-delete-dialog.component';
import { IMembre } from 'app/shared/model/membre.model';

@Injectable({ providedIn: 'root' })
export class MembreResolve implements Resolve<IMembre> {
    constructor(private service: MembreService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Membre> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Membre>) => response.ok),
                map((membre: HttpResponse<Membre>) => membre.body)
            );
        }
        return of(new Membre());
    }
}

export const membreRoute: Routes = [
    {
        path: 'membre',
        component: MembreComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEvenementApp.membre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'membre/:id/view',
        component: MembreDetailComponent,
        resolve: {
            membre: MembreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.membre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'membre/new',
        component: MembreUpdateComponent,
        resolve: {
            membre: MembreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.membre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'membre/:id/edit',
        component: MembreUpdateComponent,
        resolve: {
            membre: MembreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.membre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const membrePopupRoute: Routes = [
    {
        path: 'membre/:id/delete',
        component: MembreDeletePopupComponent,
        resolve: {
            membre: MembreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.membre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
