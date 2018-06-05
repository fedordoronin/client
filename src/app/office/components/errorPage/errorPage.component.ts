import { Component, OnInit } from "@angular/core";
import { ErrorService } from "../../services/error.service";

@Component({
    selector: 'app-error',
    templateUrl: 'errorPage.component.html'
})
export class ErrorPageComponent implements OnInit {
    
    error: string;

    constructor (
        private errorService: ErrorService
    ) {}

    ngOnInit () {
        this.error = this.errorService.getError();
    }

}