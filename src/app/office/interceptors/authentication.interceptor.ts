import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		let token = localStorage.getItem('token');

		if (token && req.url.indexOf('sendpulse') === -1 ) {
			req = req.clone({
				headers: req.headers.set(
					'Authorization', token
				)
			});
		}

		return next.handle(req).do((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {

				}
			}, (err: any) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 402) {
						console.log('Error: Ошибка авторизации! Попробуйте удалить token из Local Storage');
					}
				}
			});
	}
}