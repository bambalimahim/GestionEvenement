import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IEvenement } from 'app/shared/model/evenement.model';
import { EvenementService } from './evenement.service';
import { IPresence } from 'app/shared/model/presence.model';
import { PresenceService } from 'app/entities/presence';

@Component({
    selector: 'jhi-evenement-update',
    templateUrl: './evenement-update.component.html'
})
export class EvenementUpdateComponent implements OnInit {
    evenement: IEvenement;
    isSaving: boolean;

    presences: IPresence[];
    dateEvenementDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected evenementService: EvenementService,
        protected presenceService: PresenceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ evenement }) => {
            this.evenement = evenement;
        });
        this.presenceService.query({ filter: 'evenement-is-null' }).subscribe(
            (res: HttpResponse<IPresence[]>) => {
                if (!this.evenement.presence || !this.evenement.presence.id) {
                    this.presences = res.body;
                } else {
                    this.presenceService.find(this.evenement.presence.id).subscribe(
                        (subRes: HttpResponse<IPresence>) => {
                            this.presences = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.evenement.id !== undefined) {
            this.subscribeToSaveResponse(this.evenementService.update(this.evenement));
        } else {
            this.subscribeToSaveResponse(this.evenementService.create(this.evenement));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvenement>>) {
        result.subscribe((res: HttpResponse<IEvenement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPresenceById(index: number, item: IPresence) {
        return item.id;
    }
}
