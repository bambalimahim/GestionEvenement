import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMembre } from 'app/shared/model/membre.model';
import { MembreService } from './membre.service';
import { IUser, UserService } from 'app/core';
import { IPresence } from 'app/shared/model/presence.model';
import { PresenceService } from 'app/entities/presence';

@Component({
    selector: 'jhi-membre-update',
    templateUrl: './membre-update.component.html'
})
export class MembreUpdateComponent implements OnInit {
    membre: IMembre;
    isSaving: boolean;

    users: IUser[];

    presences: IPresence[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected membreService: MembreService,
        protected userService: UserService,
        protected presenceService: PresenceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ membre }) => {
            this.membre = membre;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.presenceService.query().subscribe(
            (res: HttpResponse<IPresence[]>) => {
                this.presences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.membre.id !== undefined) {
            this.subscribeToSaveResponse(this.membreService.update(this.membre));
        } else {
            this.subscribeToSaveResponse(this.membreService.create(this.membre));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMembre>>) {
        result.subscribe((res: HttpResponse<IMembre>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackPresenceById(index: number, item: IPresence) {
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
