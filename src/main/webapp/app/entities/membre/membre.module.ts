import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionEvenementSharedModule } from 'app/shared';
import { GestionEvenementAdminModule } from 'app/admin/admin.module';
import {
    MembreComponent,
    MembreDetailComponent,
    MembreUpdateComponent,
    MembreDeletePopupComponent,
    MembreDeleteDialogComponent,
    membreRoute,
    membrePopupRoute
} from './';

const ENTITY_STATES = [...membreRoute, ...membrePopupRoute];

@NgModule({
    imports: [GestionEvenementSharedModule, GestionEvenementAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MembreComponent, MembreDetailComponent, MembreUpdateComponent, MembreDeleteDialogComponent, MembreDeletePopupComponent],
    entryComponents: [MembreComponent, MembreUpdateComponent, MembreDeleteDialogComponent, MembreDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEvenementMembreModule {}
