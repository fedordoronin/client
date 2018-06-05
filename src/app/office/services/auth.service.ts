import { Injectable } from "@angular/core";
import { IUser } from "../interfaces/user.interface";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";

@Injectable()
export class AuthService {
    token: string = null;
    user: IUser;

    constructor (
        private http: HttpClient,
        private conf: ConfigService
    ){
        this.token = localStorage.getItem('token');
    }

    login (email: string, password: string) {
        return this.http.post(`${ this.conf.getKey('apiUrl') }/security/signIn`, { email, password})
        .map(token => {
            localStorage.setItem('token', <string>token);
            return this.token;
        });
    }

    getCurrentUser (): Observable<IUser> {
        return this.http.get(`${ this.conf.getKey('apiUrl') }/user/current`);
    }

    logOut (): Boolean {
        localStorage.removeItem('token');
        return true;
    }

    loadUser (): Promise<any> {

        if (!this.token) {
            return Promise.resolve(null);
        }

        return this.http.get(`${ this.conf.getKey('apiUrl') }/user/current`)
        .toPromise()
        .then(res => {
            this.user = res;
        });
    }
}