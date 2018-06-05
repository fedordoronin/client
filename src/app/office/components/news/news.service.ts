import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ConfigService } from "../../services/config.service";
import { Observable } from "rxjs/Observable";
import { INews } from "../../interfaces/news.interface";


@Injectable()
export class NewsService {

    private API_URL;

    //Event update list news
    public eUpdate: EventEmitter<any> = new EventEmitter;

    constructor (
        private http: HttpClient,
        private conf: ConfigService
    ) {
        this.API_URL = this.conf.getKey('apiUrl');
    }

    getAll (): Observable<INews[]> {
        return this.http.get(this.API_URL + '/news')
            .map(res => res as INews[]);
    }

    getById (id: string): Observable<INews> {
        return this.http.get(this.API_URL + '/news/' + id);
    }

    remove (id: string): Observable<any> {
        return this.http.delete(this.API_URL + '/news/' + id);
    }

    update (id: string, data: INews): Observable<any> {
        return this.http.post(this.API_URL + '/news/' + id, data);
    }

    create (data: INews): Observable<INews> {
        return this.http.post(this.API_URL + '/news', data);
    }

}