import { Component, trigger, transition, style, animate, Input } from "@angular/core";

@Component({
    selector: 'page-loader',
    templateUrl: 'page-loader.component.html',
    animations: [
        trigger(
        'enterAnimation', [
            transition(':enter', [
            style({opacity: 0}),
            animate('100ms', style({opacity: 1}))
            ]),
            transition(':leave', [
            style({opacity: 1}),
            animate('100ms', style({ opacity: 0}))
            ])
        ]
        )
    ],
})
export class PageLoaderComponent {
    @Input() pageLoad: boolean;
}