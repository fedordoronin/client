import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Router } from "@angular/router";


@Injectable()
export class TestService {

    constructor(
        private http: Http
    ) {}

    test (): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("START");
            setTimeout(() => {
                console.log("RUN");
                resolve();
            }, 10000);
        });
    }
}