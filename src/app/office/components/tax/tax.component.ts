import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ITax } from '../../interfaces/tax.interface';
import { TaxService } from './tax.service';
import { CompanyService } from '../company/company.service';
import { ActivatedRoute } from '@angular/router';
import { Tax } from '../../models/tax.model';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user.interface';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-nalogi',
  templateUrl: 'tax.component.html',
  styles: []
})
export class TaxComponent implements OnInit {

	pageLoad = false;

	allNalogiList: ITax[] = [];
	nalogiList: ITax[] = [];
	formData: ITax;
	modalShown: boolean;
	hasDeleted: boolean;
	comment: string;
	userRole: string;

	countAll: number;

	month = [
		'Январь', 'Февраль', 'Март', 'Апрель', 
		'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
		'Октябрь', 'Ноябрь', 'Декабрь',
	];

	years = [ 2017, 2018, 2019, 2020, 2021, 2022, 2023 ];

	//filter
	filterMonth: number = null;
	filterYear: number = null;

	//route
	company_id: string;
	company_name: string;
	company_owner: IUser;

	//actions
	editItem: boolean = false;

	constructor(
		private taxService: TaxService,
		private companyService: CompanyService,
		private route: ActivatedRoute,
		private auth: AuthService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {
		if (!this.company_id) {
			this.route.params.subscribe(params => this.company_id = params['id']);
			this.userRole = this.auth.user._access.value;
		}

		this.updateList();
	}

	private updateList (): void {
		this.pageLoad = true;
		this.taxService.getAllByCompany(this.company_id)
		.subscribe(res => {

			if (this.userRole === 'ROLE_CLIENT') {
				res = this.taxClientFilter(res);
			}

			this.allNalogiList = res;
			this.nalogiList = res;
			this.getCompanyName();
			this.checkDeleted();
			this.resetForm();
			this.pageLoad = false;
			this.countAll = res.length;
		});
	}

	/**
	 * Функция фильтрует помеченные на удаление и не заполненные налоги
	 * 
	 * @param taxes Taxes list
	 */
	private taxClientFilter (taxes: ITax[]): ITax[] {

		return taxes.filter(tax => {
		let result = true;

		if (tax._delete) return false;
		
		return result;
		});
	}

	/**
	 * Пометка на удаление
	 * @param e
	 * @param {ITax} el
	 * @param {boolean} del
	 */
	markForDelete (e, el: ITax, del: boolean): void {
		e.preventDefault();
		this.pageLoad = true;
		this.taxService.markForDelete(el._id, del)
		.subscribe(res => {
			if (res.ok === 1) {
				this.updateList();
			}
		});
	}

	/**
	* Проверка есть ли элементы помеченные на удаление
	*/
	checkDeleted (): void {
		let disabled = this.nalogiList.filter(el => {
			return el._delete ? true : false;
		});

		this.hasDeleted = (disabled.length > 0) ? true : false;
	}

	/**
	 * Всего на удаление
	 */
	getCountDeleted () {
		let count = 0;

		for (let tax of this.allNalogiList) {
			if (tax._delete) count++;
		}

		return count;
	}

	/**
	 * Филтрация по месяцу и году
	 */
	filter (): void {
		let data: ITax = {};

		data.company = this.company_id;

		if (this.filterMonth) data._month = this.filterMonth;
		if (this.filterYear) data._year = this.filterYear;

		this.pageLoad = true;

		this.taxService.filter(data)
		.subscribe(res => {
			if (res.length === 0) {
				this.allNalogiList = [];
			} else {
				this.allNalogiList = res;
			}

			this.cdr.detectChanges();
			this.checkDeleted();
			this.pageLoad = false;
		});
	}

	/**
	 * Получение названия компании
	 */
	getCompanyName (): void {
		this.companyService.getById(this.company_id)
		.subscribe(res => {
			this.company_name = res.name;
			this.company_owner = <IUser>res.user;
		});
	}

	/**
	 * Удаление элеиентов
	 */
	delete (): void {
		let items: ITax[] = this.nalogiList.filter(item => {
			return item._delete === true;
		});

		this.taxService.delete(items)
		.subscribe(res => {
			this.updateList();
		});
	}

	/**
	 * Сброс формы
	 */
	resetForm (): void {
		this.formData = new Tax();
	}

	/**
	 * @param {ITax} item
	 */
	setCommentText (item: ITax): void {
		this.comment = item.comment;
	}

	/**
	 * Расчет итоговой суммы налогов элемента
	 * @param {ITax} n
	 * @returns {string}
	 */
	getSumm (n: ITax): string {
		let summ: number = n._envd + n._foms + n._fss + n._fss_ns + n._ndfl + n._nds + n._pfr + n._profit_fb + n._profit_rf + n._usn;

		return summ.toFixed(2);
	}

	/**
	 * Функция которая вызывается при собитии изменения страницы
	 * @param list
	 */
	pageChange (list): void {
		this.nalogiList = list;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	checkLength(): boolean {
		return this.nalogiList.length > 0;
	}

}
