import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ICompany } from "../../interfaces/company.interface";
import { AuthService } from "../../services/auth.service";
import { CompanyService } from "./company.service";
import { Company } from "../../models/company.model";


@Component({
    selector: "company-form",
    templateUrl: "form.component.html"
})
export class FormCompanyComponent implements OnInit {
    
    error: string;
    
    @Input() editMode: boolean = false;
    @Input() company: ICompany;
    @Input() userId: string;
    @Output() onUpdateCompanyList = new EventEmitter;
    @ViewChild('closeForm') modal: ElementRef;

    constructor (
        private auth: AuthService,
        private service: CompanyService
    ) {}

    ngOnInit () {
        this.resetForm();
    }
    
    create () {
        let el: HTMLElement = this.modal.nativeElement as HTMLElement;
        this.company.user = this.userId ? this.userId : this.auth.user;
        this.error = null;
        
        this.service.create(this.company)
            .subscribe(
                res => {
                    el.click();
                    this.onUpdateCompanyList.emit();
                },
                error => {
                    this.error = null;
                    let textErr: string = error.error.message;

                    if (textErr.indexOf('inn_1') > -1) this.error = "Компания с таким ИНН уже существует";
                    if (textErr.indexOf('name_1') > -1) this.error = "Компания с таким именем уже существует";
                    if (textErr.indexOf('kpp_1') > -1) this.error = "Компания с таким КПП уже существует";
                }
            );
    }

    update () {
        let id = this.company._id;
        delete this.company._id;

        let el: HTMLElement = this.modal.nativeElement as HTMLElement;

        this.service.update(id, this.company)
            .subscribe( res => {
                el.click();
                this.onUpdateCompanyList.emit();
            });
    }

    resetForm () {
        this.company = new Company();
    }
}