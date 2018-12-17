import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Presence } from 'app/shared/model/presence.model';
import { PresenceService } from './presence.service';
import { PresenceComponent } from './presence.component';
import { PresenceDetailComponent } from './presence-detail.component';
import { PresenceUpdateComponent } from './presence-update.component';
import { PresenceDeletePopupComponent } from './presence-delete-dialog.component';
import { IPresence } from 'app/shared/model/presence.model';

@Injectable({ providedIn: 'root' })
export class PresenceResolve implements Resolve<IPresence> {
    constructor(private service: PresenceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Presence> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Presence>) => response.ok),
                map((presence: HttpResponse<Presence>) => presence.body)
            );
        }
        return of(new Presence());
    }
}

export const presenceRoute: Routes = [
    {
        path: 'presence',
        component: PresenceComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gestionEvenementApp.presence.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presence/:id/view',
        component: PresenceDetailComponent,
        resolve: {
            presence: PresenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.presence.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presence/new',
        component: PresenceUpdateComponent,
        resolve: {
            presence: PresenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.presence.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'presence/:id/edit',
        component: PresenceUpdateComponent,
        resolve: {
            presence: PresenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.presence.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const presencePopupRoute: Routes = [
    {
        path: 'presence/:id/delete',
        component: PresenceDeletePopupComponent,
        resolve: {
            presence: PresenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionEvenementApp.presence.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
