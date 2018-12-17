import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILieu } from 'app/shared/model/lieu.model';

@Component({
    selector: 'jhi-lieu-detail',
    templateUrl: './lieu-detail.component.html'
})
export class LieuDetailComponent implements OnInit {
    lieu: ILieu;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ lieu }) => {
            this.lieu = lieu;
        });
    }

    previousState() {
        window.history.back();
    }
}
