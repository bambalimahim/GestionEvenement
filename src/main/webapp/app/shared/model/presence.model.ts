import { IEvenement } from 'app/shared/model//evenement.model';
import { IMembre } from 'app/shared/model//membre.model';

export interface IPresence {
    id?: number;
    evenement?: IEvenement;
    membres?: IMembre[];
}

export class Presence implements IPresence {
    constructor(public id?: number, public evenement?: IEvenement, public membres?: IMembre[]) {}
}
