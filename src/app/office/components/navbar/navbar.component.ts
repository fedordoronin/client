import { Component, OnInit, Input, ChangeDetectorRef, HostListener } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NewsService } from '../news/news.service';
import { INews } from '../../interfaces/news.interface';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  news: INews[];
  message: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private newsService: NewsService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) { }

  @Input() user: IUser;
  @Input() title: string;

  @HostListener('onNewsUpdate') onNewsUpdate () {
    this.getNews();
  }

  ngOnInit() {

    this.updatePage();

    this.newsService.eUpdate.subscribe(res => {
      this.updatePage();
    });

  }

  private updatePage () {
    let p_news = this.getNews();

    this.getMessage();
    
    Promise.all([ p_news ])
      .then(res => {
        this.news = res[0];

        this.cdr.detectChanges();
      });
  }

  logOut () {
    this.authService.logOut();
    location.reload();
  }

  getNews (): Promise<INews[]> {
    return this.newsService.getAll().toPromise();
  }

  setMessage (): void {
    this.messageService.setMessage(this.message)
      .subscribe(res => {
        this.getMessage();
      });
  }

  getMessage (): void {
    this.messageService.getMessage()
      .subscribe(res => {
        this.message = res.text;
        this.messageService.eUpdateMessage.emit();
      })
  }

}
