import { Injectable } from "@angular/core";

import * as config from "../../../../config.json";

@Injectable()
export class ConfigService {
    
    constructor () {}

    getKey (key: string) {
        return config[key];
    }
}