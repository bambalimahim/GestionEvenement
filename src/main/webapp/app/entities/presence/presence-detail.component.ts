import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPresence } from 'app/shared/model/presence.model';

@Component({
    selector: 'jhi-presence-detail',
    templateUrl: './presence-detail.component.html'
})
export class PresenceDetailComponent implements OnInit {
    presence: IPresence;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ presence }) => {
            this.presence = presence;
        });
    }

    previousState() {
        window.history.back();
    }
}
