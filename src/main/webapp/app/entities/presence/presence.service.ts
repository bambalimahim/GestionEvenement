import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPresence } from 'app/shared/model/presence.model';

type EntityResponseType = HttpResponse<IPresence>;
type EntityArrayResponseType = HttpResponse<IPresence[]>;

@Injectable({ providedIn: 'root' })
export class PresenceService {
    public resourceUrl = SERVER_API_URL + 'api/presences';

    constructor(protected http: HttpClient) {}

    create(presence: IPresence): Observable<EntityResponseType> {
        return this.http.post<IPresence>(this.resourceUrl, presence, { observe: 'response' });
    }

    update(presence: IPresence): Observable<EntityResponseType> {
        return this.http.put<IPresence>(this.resourceUrl, presence, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPresence>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPresence[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
