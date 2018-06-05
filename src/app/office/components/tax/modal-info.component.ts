import { Component, Input } from "@angular/core";
import { ITax } from "../../interfaces/tax.interface";

@Component({
    selector: 'modal-tax-info',
    templateUrl: 'modal-info.component.html'
})
export class ModalInfoComponent {

    @Input() formData: ITax;

}