import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ITax } from "../../interfaces/tax.interface";
import { TaxService } from "./tax.service";
import { AuthService } from "../../services/auth.service";
import { IUser } from "../../interfaces/user.interface";

@Component({
    selector: "tax-form",
    templateUrl: "form.component.html"
})
export class FormTaxComponent implements OnInit {

    currentUser: IUser;

    @Input() editItem: boolean;
    @Input() formData: ITax;
    @Input() companyId: string;

    @Output() onUpdateList = new EventEmitter;

    month = [
        'Январь', 'Февраль', 'Март', 'Апрель', 
        'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
        'Октябрь', 'Ноябрь', 'Декабрь',
      ];
    
      years = [ 2017, 2018, 2019, 2020, 2021, 2022, 2023 ];

    constructor (
        private taxService: TaxService,
        private authService: AuthService
    ) {}
    
    ngOnInit () {
        this.currentUser = this.authService.user;
    }

    create () {
        this.formData.company = this.companyId;
        this.taxService.create(this.formData)
            .subscribe(res => {
            this.onUpdateList.emit();
        });
    }

    edit () {
        this.taxService.edit(this.formData)
            .subscribe(res => {
                this.onUpdateList.emit();
            }
        );
    }

    compareFn (op1, op2) {
        return op1 === op2;
    }

    dotedChange (value: number) {
        return value.toFixed(2);
    }

}