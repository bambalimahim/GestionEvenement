import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEvenement } from 'app/shared/model/evenement.model';

type EntityResponseType = HttpResponse<IEvenement>;
type EntityArrayResponseType = HttpResponse<IEvenement[]>;

@Injectable({ providedIn: 'root' })
export class EvenementService {
    public resourceUrl = SERVER_API_URL + 'api/evenements';

    constructor(protected http: HttpClient) {}

    create(evenement: IEvenement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(evenement);
        return this.http
            .post<IEvenement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(evenement: IEvenement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(evenement);
        return this.http
            .put<IEvenement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEvenement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEvenement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(evenement: IEvenement): IEvenement {
        const copy: IEvenement = Object.assign({}, evenement, {
            dateEvenement:
                evenement.dateEvenement != null && evenement.dateEvenement.isValid() ? evenement.dateEvenement.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateEvenement = res.body.dateEvenement != null ? moment(res.body.dateEvenement) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((evenement: IEvenement) => {
                evenement.dateEvenement = evenement.dateEvenement != null ? moment(evenement.dateEvenement) : null;
            });
        }
        return res;
    }
}
