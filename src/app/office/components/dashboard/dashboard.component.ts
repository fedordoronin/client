import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { IUser } from "../../interfaces/user.interface";
import { AuthService } from "../../services/auth.service";
import { ConfigService } from "../../services/config.service";
import { MessageService } from "../../services/message.service";


@Component({
    selector: 'app-home',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.scss']
})
export class DashboardComponent implements OnInit {

    title = 'Head&Heart';
    user: IUser;
    message: string;
  
    constructor (
      private authService: AuthService,
      private conf: ConfigService,
      private messageService: MessageService,
      private cdr: ChangeDetectorRef
    ) {}
  
    ngOnInit () {
      this.user = this.authService.user;
      this.messageService.eUpdateMessage.subscribe(res => {
        this.getMessage();
      });
    }
  
    getMessage () {
      this.messageService.getMessage()
        .subscribe(res => {
          this.message = res.text;
          this.cdr.detectChanges();
        })
    }
}