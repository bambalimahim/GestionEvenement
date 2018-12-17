import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GestionEvenementEvenementModule } from './evenement/evenement.module';
import { GestionEvenementLieuModule } from './lieu/lieu.module';
import { GestionEvenementPresenceModule } from './presence/presence.module';
import { GestionEvenementMembreModule } from './membre/membre.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GestionEvenementEvenementModule,
        GestionEvenementLieuModule,
        GestionEvenementPresenceModule,
        GestionEvenementMembreModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEvenementEntityModule {}
