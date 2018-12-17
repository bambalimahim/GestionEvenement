import { Moment } from 'moment';
import { IPresence } from 'app/shared/model//presence.model';
import { ILieu } from 'app/shared/model//lieu.model';

export interface IEvenement {
    id?: number;
    nom?: string;
    dateEvenement?: Moment;
    presence?: IPresence;
    lieus?: ILieu[];
}

export class Evenement implements IEvenement {
    constructor(
        public id?: number,
        public nom?: string,
        public dateEvenement?: Moment,
        public presence?: IPresence,
        public lieus?: ILieu[]
    ) {}
}
