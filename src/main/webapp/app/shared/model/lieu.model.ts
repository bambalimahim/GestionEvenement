import { IEvenement } from 'app/shared/model//evenement.model';

export interface ILieu {
    id?: number;
    nom?: string;
    evenement?: IEvenement;
}

export class Lieu implements ILieu {
    constructor(public id?: number, public nom?: string, public evenement?: IEvenement) {}
}
