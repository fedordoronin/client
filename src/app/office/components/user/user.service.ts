import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../../interfaces/user.interface";
import { Observable } from "rxjs/Observable";
import { IRole } from "../../interfaces/role.interface";
import { IPosition } from "../../interfaces/position.interface";
import { ConfigService } from "../../services/config.service";

@Injectable()
export class UserService {

    private API_URL: string;
    
    constructor( 
        private http: HttpClient,
        private conf: ConfigService
    ) {
        this.API_URL = this.conf.getKey('apiUrl');
    }

    create (data: IUser): Observable<IUser> {
        return this.http.post(`${ this.API_URL }/user/create`, data);
    }

    edit (data: IUser): Observable<IUser> {
        return this.http.post(`${ this.API_URL }/user/edit`, data);
    }

    delete (users: IUser[]): Observable<any> {
        return this.http.post(`${ this.API_URL }/user/delete`, users);
    }

    getUsers (): Observable<IUser[]> {
        return this.http.get(`${ this.API_URL }/user`)
            .map(res => res as IUser[]);
    }

    getUserById (user_id: string): Observable<IUser> {
        return this.http.get(`${ this.API_URL  }/user/${ user_id }`);
    }

    getUserRoles (): Observable<IRole[]> {
        return this.http.get(`${ this.API_URL }/security/roles`)
            .map(res => res as IRole[]);
    }

    getPositions (): Observable<IPosition[]> {
        return this.http.get(`${ this.API_URL }/position`)
            .map(res => res as IPosition[]);
    }

    markForDelete (user: IUser, action: boolean): Observable<any> {
        return this.http.post(`${ this.API_URL }/user/markfordelete`, { user, action });
    }

}