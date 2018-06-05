import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from './user.service';
import { User } from '../../models/user.model';
import { IRole } from '../../interfaces/role.interface';
import { IPosition } from '../../interfaces/position.interface';
import { NotifyService } from '../notify/notify.service';

@Component({
	selector: 'app-user',
	templateUrl: 'user.component.html',
	styles: []
})
export class UserComponent implements OnInit {

	constructor(
		private userService: UserService,
		private notifyService: NotifyService
	) {
		this.createData = new User;
	}

	pageLoad = false;

	allUserList: IUser[];
	userList: IUser[];
	createData: IUser;
	userRoles: IRole[];
	userPositions: IPosition[];
	hasDeleted: boolean;

	editMode: boolean = false;
	error: string;

	//Search
	i_search: string;
	res_search: IUser[];

	@ViewChild('closeForm') modal: ElementRef;

	ngOnInit() {
		
		this.userService.getUserRoles()
			.subscribe(res => {
				this.userRoles = res;
			});
		
		this.userService.getPositions()
			.subscribe(res => {
				this.userPositions = res;
			});

		this.updateListUsers();
	}

	/**
	 * Обновление списка пользователей
	 */
	updateListUsers () {
		this.pageLoad = true;
		this.userService.getUsers()
		.subscribe(res => {
			this.userList = res;
			this.allUserList = res;
			this.refreshCreateData()
			this.checkDeleted();
			this.pageLoad = false;
		});
	}

	/**
	 * Создание пользователя
	 */
	create () {

		let el: HTMLElement = this.modal.nativeElement as HTMLElement;

		this.error = null;
		this.userService.create(this.createData)
		.subscribe(res => {
			this.updateListUsers();
			this.refreshCreateData();
			this.error = null;
			el.click();
		}, error => {
		
			error = error.error.message;

			if (error.indexOf('email_1') > -1) {
				this.error = "Пользователь с таким Email уже существует"
			} 
			
			if (error.indexOf('login_1') > -1) {
				this.error = "Пользователь с таким Логином уже существует"
			}
		});
	}

	/**
	 * Функция для селекторов
	 * 
	 * @param op1 
	 * @param op2 
	 */
	compareFn (op1, op2) {
		if (!op1 && !op2) return true;
		if (!op1 || !op2) return false;
		return op1._id === op2._id;
	}

	/**
	 * Сброс формы
	 */
	refreshCreateData () {
		this.createData = new User();
	}

	/**
	 * Изменение данных пользователя
	 */
	edit () {
		let el: HTMLElement = this.modal.nativeElement as HTMLElement;
		this.userService.edit(this.createData)
			.subscribe(res => {
				this.updateListUsers();
				this.refreshCreateData();
				el.click();
			});
	}

	/**
	 * Удаление пользователя
	 */
	delete () {
		let deleteUsers = this.userList.filter(item => {
			return item._delete;
		});

		this.userService.delete(deleteUsers)
			.subscribe(res => {
				this.updateListUsers();
			});
	}

	/**
	 * Помечаем пользователя для удалениея
	 * 
	 * @param e 
	 * @param el 
	 * @param action 
	 */
	markForDelete (e, el: IUser, action: boolean) {
		this.pageLoad = true;
		this.userService.markForDelete(el, action)
			.subscribe(res => {
				if (res.ok === 1) {
					this.updateListUsers();
				}
			});
	}

	/**
	 * Функция проверяет есть ли помеченные на удаление пользователи
	 */
	private checkDeleted () {
		let disabled = this.userList.filter(el => {
			return el._delete ? true : false;
		});

		this.hasDeleted = (disabled.length > 0) ? true : false;
	}

	/**
	 * Функция вызывается сервисов pagination
	 * 
	 * @param list 
	 */
	pageChange (list) {
		this.userList = list;
	}

	/**
	 * Поиск пользователей
	 */
	search () {
		if (this.i_search) {
			this.userList = this.allUserList.filter(val => {
				let name = val.name.toLowerCase();
				return name.indexOf(this.i_search.toLowerCase()) + 1;
			});
		} else {
			this.updateListUsers();
		}
	}

}
