import { Injectable } from "@angular/core";
import { ITax } from "../../interfaces/tax.interface";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "../../services/config.service";

@Injectable()
export class TaxService {

    private API_URL: string;
    
    constructor( 
        private http: HttpClient,
        private conf: ConfigService
    ) {
        this.API_URL = this.conf.getKey('apiUrl');
    }

    create (data: ITax): Observable<ITax> {
        return this.http.post(this.API_URL + '/tax/create', data)
            .map(result => result as ITax);
    }

    getAll (): Observable<ITax[]> {
        return this.http.get(this.API_URL + '/tax')
            .map(result => result as ITax[]);
    }

    getAllByCompany (_id: string): Observable<ITax[]> {
        return this.http.get(this.API_URL + '/tax/company/' + _id)
            .map(result => result as ITax[]);
    }

    markForDelete (_id: string, _delete: boolean): Observable<any> {
        return this.http.post(this.API_URL + '/tax/markfordelete', { _id, _delete });
    }

    filter (data: any): Observable<ITax[]> {
        return this.http.post(this.API_URL + '/tax/filter', data)
            .map(res => res as ITax[]);
    }

    edit (data: ITax): Observable<any> {
        return this.http.post(this.API_URL + '/tax/update', data);
    }

    delete (items: ITax[]): Observable<any> {
        return this.http.post(this.API_URL + '/tax/delete', items);
    }

}