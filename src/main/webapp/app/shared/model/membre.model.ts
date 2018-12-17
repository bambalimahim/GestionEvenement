import { IUser } from 'app/core/user/user.model';
import { IPresence } from 'app/shared/model//presence.model';

export interface IMembre {
    id?: number;
    telephone?: string;
    user?: IUser;
    presences?: IPresence[];
}

export class Membre implements IMembre {
    constructor(public id?: number, public telephone?: string, public user?: IUser, public presences?: IPresence[]) {}
}
