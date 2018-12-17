import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ILieu } from 'app/shared/model/lieu.model';
import { LieuService } from './lieu.service';
import { IEvenement } from 'app/shared/model/evenement.model';
import { EvenementService } from 'app/entities/evenement';

@Component({
    selector: 'jhi-lieu-update',
    templateUrl: './lieu-update.component.html'
})
export class LieuUpdateComponent implements OnInit {
    lieu: ILieu;
    isSaving: boolean;

    evenements: IEvenement[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected lieuService: LieuService,
        protected evenementService: EvenementService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ lieu }) => {
            this.lieu = lieu;
        });
        this.evenementService.query().subscribe(
            (res: HttpResponse<IEvenement[]>) => {
                this.evenements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.lieu.id !== undefined) {
            this.subscribeToSaveResponse(this.lieuService.update(this.lieu));
        } else {
            this.subscribeToSaveResponse(this.lieuService.create(this.lieu));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILieu>>) {
        result.subscribe((res: HttpResponse<ILieu>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
