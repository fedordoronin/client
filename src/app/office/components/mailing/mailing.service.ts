import { Injectable } from "@angular/core";
import { ConfigService } from "../../services/config.service";
import { HttpClient } from "@angular/common/http";
import { IMailing } from "../../interfaces/mailing.interface";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MailingService {

    private API_URL: string;
    
    constructor( 
        private http: HttpClient,
        private conf: ConfigService
    ) {
        this.API_URL = this.conf.getKey('apiUrl');
    }

    create (data: IMailing): Observable<IMailing> {
        return this.http.put(this.API_URL + '/mailing', data).map(res => res as IMailing);
    }

    update (id: string, data: IMailing): Observable<any> {
        return this.http.post(this.API_URL + '/mailing/' + id, data);
    }

    remove (id: string): Observable<any> {
        return this.http.delete(this.API_URL + '/mailing/' + id);
    }

    getAll (): Observable<IMailing[]> {
        return this.http.get(this.API_URL + '/mailing').map(res => res as IMailing[]);
    }

    getById (id: string): Observable<IMailing> {
        return this.http.get(this.API_URL + '/mailing/' + id).map(res => res as IMailing);
    }

    send (_id: string): Observable<any> {
        return this.http.post(this.API_URL + '/mailing/send', { _id });
    }

    removeAttachment (mailing_id: string, file: string): Observable<any> {
        return this.http.post(this.API_URL + '/mailing/removeAttachment/' + mailing_id, { file });
    }

}