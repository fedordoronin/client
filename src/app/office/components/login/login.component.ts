import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
	selector: 'app-login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

	email: string;
	password: string;
	error: string;

	constructor(
			private authService: AuthService,
			private router: Router,
			private el: ElementRef,
			private renderer: Renderer2
	) { }

	ngOnInit() {
		if (this.authService.token) {
			this.router.navigate(['/office']);
		}
	}

	login (e) {
			let loader = this.el.nativeElement.querySelector('#loader-login');
			let btn = this.el.nativeElement.querySelector('#btn_login');
			this.error = null;

			this.renderer.removeClass(loader, 'hidden');
			this.renderer.addClass(btn, 'hidden');

			this.authService.login(this.email, this.password)
				.subscribe(res => {
					this.renderer.addClass(loader, 'hidden');
					this.renderer.removeClass(btn, 'hidden');
					location.reload();
			}, error => {
				this.error = error.error.message;
				this.renderer.addClass(loader, 'hidden');
				this.renderer.removeClass(btn, 'hidden');
			});
	}

}
