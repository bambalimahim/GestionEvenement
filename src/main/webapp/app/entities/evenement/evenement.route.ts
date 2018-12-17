import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Evenement } from 'app/shared/model/evenement.model';
import { EvenementService } from './evenement.service';
import { EvenementComponent } from './evenement.component';
import { EvenementDetailComponent } from './evenement-detail.component';
import { EvenementUpdateComponent } from './evenement-update.component';
import { EvenementDeletePopupComponent } from './evenement-delete-dialog.component';
import { IEvenement } from 'app/shared/model/evenement.model';

@Injectable({ providedIn: 'root' })
export class EvenementResolve implements Resolve<IEvenement> {
    constructor(private service: EvenementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Evenement> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Evenement>) => response.ok),
                map((evenement: HttpResponse<Evenement>) => evenement.body)
            );
        }
        return of(new Evenement());
    }
}

export const evenementRoute: Routes = [
    {
        path: 'evenement',
        component: EvenementComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEvenementApp.evenement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'evenement/:id/view',
        component: EvenementDetailComponent,
        resolve: {
            evenement: EvenementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.evenement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'evenement/new',
        component: EvenementUpdateComponent,
        resolve: {
            evenement: EvenementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.evenement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'evenement/:id/edit',
        component: EvenementUpdateComponent,
        resolve: {
            evenement: EvenementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.evenement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const evenementPopupRoute: Routes = [
    {
        path: 'evenement/:id/delete',
        component: EvenementDeletePopupComponent,
        resolve: {
            evenement: EvenementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.evenement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
