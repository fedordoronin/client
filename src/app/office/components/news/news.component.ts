import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { INews } from "../../interfaces/news.interface";
import { NewsService } from "./news.service";

@Component({
    moduleId: module.id,
    selector: 'app-news',
    templateUrl: 'news.component.html'
})
export class NewsComponent implements OnInit {

    pageLoad: boolean = false;

    allNewsList: INews[];
    newsList: INews[];
    deleteNewsId: string;

    createNewsData: INews = {};
    editMode: boolean = false;

    constructor (
        private newsService: NewsService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit () {
        this.updatePage();
    }

    private updatePage (): void {
        let getAllNewsPromise = this.getAllNews();

        Promise.all([ getAllNewsPromise ])
            .then(res => {
                this.allNewsList = res[0];
                this.createNewsData = {};
                this.pageLoad = false;
                this.newsService.eUpdate.emit();

                this.cdr.detectChanges();
            });
    }

    private getAllNews (): Promise<INews[]> {
        this.pageLoad = true;
        return this.newsService.getAll().toPromise();
    }

    pageChange (list: INews[]) {
        this.newsList = list;
    }

    createNews () {
        this.pageLoad = true;
        this.newsService.create(this.createNewsData)
            .subscribe(res => {
                this.updatePage();
            });
    }

    updateNews () {
        this.pageLoad = true;
        const id = this.createNewsData._id;
        delete this.createNewsData._id;

        this.newsService.update(id, this.createNewsData)
            .subscribe(res => {
                this.updatePage();
            });
    }

    removeNews () {
        this.pageLoad = true;
        this.newsService.remove(this.deleteNewsId)
            .subscribe(res => {
                this.updatePage();
            });
    }
}