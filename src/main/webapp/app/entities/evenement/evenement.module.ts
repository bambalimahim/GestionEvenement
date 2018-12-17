import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEvenementSharedModule } from 'app/shared';
import {
    EvenementComponent,
    EvenementDetailComponent,
    EvenementUpdateComponent,
    EvenementDeletePopupComponent,
    EvenementDeleteDialogComponent,
    evenementRoute,
    evenementPopupRoute
} from './';

const ENTITY_STATES = [...evenementRoute, ...evenementPopupRoute];

@NgModule({
    imports: [GestionEvenementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EvenementComponent,
        EvenementDetailComponent,
        EvenementUpdateComponent,
        EvenementDeleteDialogComponent,
        EvenementDeletePopupComponent
    ],
    entryComponents: [EvenementComponent, EvenementUpdateComponent, EvenementDeleteDialogComponent, EvenementDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEvenementEvenementModule {}
