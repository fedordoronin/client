import { Component, OnInit } from "@angular/core";
import { trigger, transition, state, style, animate } from "@angular/animations";
import { NotifyService } from "./notify.service";

@Component({
    selector: 'app-notify',
    templateUrl: 'notify.component.html',
    styleUrls: ['style.scss'],
    animations: [
        trigger('visibleAnim', [
            state('hidden', style({
                display: "none",
            })),
            state('visible', style({
                display: "block",
            })),
            transition('small <=> large', animate('1s ease-in-out')),
        ])
    ]
})
export class NotifyComponent implements OnInit {

    public state: string = 'hidden';
    public text: string;
    public type: string;

    constructor (
        private service: NotifyService
    ) {
        this.text = '';
        this.type = '';
    }

    ngOnInit () {
        this.service.e().subscribe(res => {
            this.showNotify(res.text, res.type);
        });
    }

    private showNotify (text: string, type: string) {
        this.text = text;
        this.type = type;
        this.state = 'visible';

        setTimeout(() => {
            this.text = '';
            this.type = '';
            this.state = 'hidden';
        }, 5000);
    }
}