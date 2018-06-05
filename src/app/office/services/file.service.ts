import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Observable } from "rxjs/Observable";

export class FileService {

    private API_URL: string;
    
    constructor( 
        private http: HttpClient,
        private conf: ConfigService
    ) {
        this.API_URL = this.conf.getKey('apiUrl');
    }

    upload (files: File[]): Observable<string[]> {
        let formData: FormData = new FormData();

        for (let file of files) {
            formData.append('files', file, file.name);
        }

        return this.http.post(this.API_URL + '/file/upload', formData).map(res => res as string[]);
    }

    remove (files: string[]): Observable<any> {
        return this.http.post(this.API_URL + '/file/remove', files);
    }

}