import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPresence } from 'app/shared/model/presence.model';
import { PresenceService } from './presence.service';
import { IEvenement } from 'app/shared/model/evenement.model';
import { EvenementService } from 'app/entities/evenement';
import { IMembre } from 'app/shared/model/membre.model';
import { MembreService } from 'app/entities/membre';

@Component({
    selector: 'jhi-presence-update',
    templateUrl: './presence-update.component.html'
})
export class PresenceUpdateComponent implements OnInit {
    presence: IPresence;
    isSaving: boolean;

    evenements: IEvenement[];

    membres: IMembre[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected presenceService: PresenceService,
        protected evenementService: EvenementService,
        protected membreService: MembreService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ presence }) => {
            this.presence = presence;
        });
        this.evenementService.query().subscribe(
            (res: HttpResponse<IEvenement[]>) => {
                this.evenements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.membreService.query().subscribe(
            (res: HttpResponse<IMembre[]>) => {
                this.membres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.presence.id !== undefined) {
            this.subscribeToSaveResponse(this.presenceService.update(this.presence));
        } else {
            this.subscribeToSaveResponse(this.presenceService.create(this.presence));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresence>>) {
        result.subscribe((res: HttpResponse<IPresence>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEvenementById(index: number, item: IEvenement) {
        return item.id;
    }

    trackMembreById(index: number, item: IMembre) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
