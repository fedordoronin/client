import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs/Observable";


@Injectable()
export class MessageService {

    public eUpdateMessage: EventEmitter<any> = new EventEmitter;

    private API_URL;

    constructor (
        private http: HttpClient,
        private config: ConfigService
    ) {
        this.API_URL = this.config.getKey('apiUrl');
    }

    setMessage (text: string): Observable<any> {
        return this.http.post(this.API_URL + '/message', { text })
            .map(res => res as string);
    }

    getMessage (): Observable<any> {
        return this.http.get(this.API_URL + '/message');
    }

}