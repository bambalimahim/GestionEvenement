import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEvenementSharedModule } from 'app/shared';
import {
    PresenceComponent,
    PresenceDetailComponent,
    PresenceUpdateComponent,
    PresenceDeletePopupComponent,
    PresenceDeleteDialogComponent,
    presenceRoute,
    presencePopupRoute
} from './';

const ENTITY_STATES = [...presenceRoute, ...presencePopupRoute];

@NgModule({
    imports: [GestionEvenementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PresenceComponent,
        PresenceDetailComponent,
        PresenceUpdateComponent,
        PresenceDeleteDialogComponent,
        PresenceDeletePopupComponent
    ],
    entryComponents: [PresenceComponent, PresenceUpdateComponent, PresenceDeleteDialogComponent, PresenceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEvenementPresenceModule {}
