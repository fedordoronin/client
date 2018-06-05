import { Component, Input, Output, EventEmitter } from "@angular/core";
import { PagerService } from "./pager.service";


@Component({
    selector: 'pager',
    templateUrl: './pager.component.html'
})
export class PagerComponent {

    pager: any = {};
    counts = [ 15, 25, 50, 100 ];
    count: number;
    private ref: Array<any> = [];

    constructor (
        private pageService: PagerService
    ) {
        if (localStorage.getItem('pageSize')) {
            this.count = +localStorage.getItem('pageSize');
        } else {
            this.count = this.counts[1];
        }
    }
    
    @Output() onPageChange: EventEmitter<any> = new EventEmitter;

    @Input('list') set list(list: Array<any>) {
        if (list) {
            this.ref = list;
            this.setPage(1);
        }
    };

    private setList (list: Array<any>) {
        this.onPageChange.emit(list);
    }

    setPage(page: number) {
       
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        this.pager = this.pageService.getPager(this.ref.length, page, this.count);
        this.setList(this.ref.slice(this.pager.startIndex, this.pager.endIndex + 1));
    }

    changeCount () {
        localStorage.setItem('pageSize', String(this.count));
        this.setPage(1);
    }

}