import { Component, OnInit, ChangeDetectorRef, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { MailingService } from "./mailing.service";
import { IMailing } from "../../interfaces/mailing.interface";
import { MailingModel } from "../../models/mailing.model";
import { ICompany } from "../../interfaces/company.interface";
import { CompanyService } from "../company/company.service";
import { FileService } from "../../services/file.service";
import { NotifyService } from "../notify/notify.service";

@Component({
    selector: "app-mailing",
    templateUrl: "mailing.component.html"
})
export class MailingComponent implements OnInit {

    listAll: IMailing[];
    list: IMailing[];
    dataMailing: IMailing;
    editMode: boolean = false;
    pageLoad = false;
    hasDelete: boolean;
    m_search: string; //строка поиска
    m_res_search: IMailing[]; //результат поиска

    //Selector companyes
    comapnyList: ICompany[];
    showSelector: boolean = false;
    i_search: string;
    res_search: ICompany[];

    /**
     * Конфигурация для редактора HTML
     */
    toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote'],
        
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        
        ['clean']                                         // remove formatting button
    ];

    @ViewChild('inputFile') inputFile: ElementRef;

    constructor (
        private mailing: MailingService,
        private cdr: ChangeDetectorRef,
        private companyService: CompanyService,
        private elemRef: ElementRef,
        private renderer: Renderer2,
        private fileService: FileService,
        private notifyService: NotifyService
    ) {}
    
    /**
     * Инициализация
     */
    ngOnInit () {
        this.resetForm();
        this.updatePage();
    }

    /**
     * Получаем все рассылки
     */
    private getAllMailing (): Promise<IMailing[]> {
        return this.mailing.getAll().toPromise();
    }

    /**
     * Получаем все компании
     */
    private getAllCompanyes () {
        return this.companyService.getAll().toPromise();
    }

    /**
     * Обновление данных
     */
    private updatePage () {
        this.pageLoad = true;
        let p1 = this.getAllMailing();
        let p2 = this.getAllCompanyes();

        Promise.all([ p1, p2 ])
            .then(res => {
                this.listAll = res[0];
                this.comapnyList = res[1];
                this.res_search = res[1];
                this.pageLoad = false;
                this.checkDelete();
                this.cdr.detectChanges();
            });
    }

    /**
     * Сброс формы
     */
    resetForm () {
        this.dataMailing = new MailingModel();
    }

    //CRUD ------------------------------------------
    add () {
        if (this.dataMailing) {
            this.mailing.create(this.dataMailing)
                .subscribe(res => {
                    this.updatePage();
                });
        }
    }

    remove () {
        let list: IMailing[] = this.listAll.filter(val => {
            return val.delete;
        });

        let pList: Array<Promise<any>> = [];

        for (let m of list) {
            pList.push(this.mailing.remove(m._id).toPromise());
        }

        Promise.all(pList)
            .then(res => {
                this.updatePage();
            })
            .catch(err => {
                this.notifyService.notify('Error:' + JSON.stringify(err.error.message), this.notifyService.types.TYPE_DANGER);
            });
    }

    update () {
        if (this.dataMailing) {
            this.mailing.update(this.dataMailing._id, this.dataMailing)
            .subscribe(res => {
                this.updatePage();
            })
        }
    }

    copy () {
        let { title, description, sent_to, options } = this.dataMailing;

        let data: IMailing = { title: title + '_copy', description, sent_to, options };

        this.mailing.create(data)
            .subscribe(res => {
                this.updatePage();
            });
    }
    //------------------------------------------------

    /**
     * Запускаем рассылку
     * 
     * @param mailing 
     */
    sendMailing (mailing: IMailing, i: number) {

        let btnActions: HTMLElement = this.elemRef.nativeElement.querySelector('#btn-actions-' + i);
        let loader = this.elemRef.nativeElement.querySelector('#loader-' + i);

        this.renderer.addClass(btnActions, 'hidden');
        this.renderer.removeClass(loader, 'hidden');

        this.mailing.send(mailing._id)
            .subscribe(res => {
                this.renderer.addClass(loader, 'hidden');
                this.renderer.removeClass(btnActions, 'hidden');
                this.notifyService.notify('Письма отправлены!', this.notifyService.types.TYPE_SUCCESS);

                this.updatePage();
            }, error => {
                this.renderer.addClass(loader, 'hidden');
                this.renderer.removeClass(btnActions, 'hidden');
                this.notifyService.notify('Ошибка отправки: ' + JSON.stringify(error.error.message), this.notifyService.types.TYPE_DANGER);
            });

    }

    /**
     * Поиск
     */
    search () {
        if (this.m_search) {
            let res = this.listAll.filter(val => {
                let search = this.m_search.toLowerCase();
                let title = val.title.toLowerCase();
                let subj  = val.options.subject.toLowerCase();

                return title.indexOf(search) + 1 || subj.indexOf(search) + 1;
            });

            this.list = res.slice(0, 10);
        } else {
            this.updatePage();
        }
    }

    /**
     * Функция вызывается сервисом pagination
     * 
     * @param list 
     */
    pageChange (list: IMailing[]) {
        this.list = list;
    }

    /**
     * Помечаем/снимаем на удаление
     * 
     * @param _id Id рассылки
     * @param del 
     */
    markForDelete (_id: string, del: boolean) {
        this.mailing.update(_id, { delete: del })
            .subscribe(res => {
                this.updatePage();
            });
    }

    /**
     * Выборка по компаниям в селекторе
     */
    searchCompanyes () {
        if (this.i_search.length > 0) {
            this.res_search = this.comapnyList.filter(item => {
                let name = item.name.toLowerCase();

                return name.indexOf(this.i_search.toLowerCase()) + 1;
            });
        } else {
            this.res_search = this.comapnyList;
        }
    }

    /**
     * Добавление компании в рассылку
     * 
     * @param company 
     */
    pushCompanyToMailing (company: ICompany) {

        let has = false;

        for (let c of this.dataMailing.sent_to) {
            if (c._id === company._id) has = true;
        }

        if (!has) {            
            this.dataMailing.sent_to.push(company);
        } else {
            this.removeCompanyFromMailing(company);
        }

    }

    /**
     * Проверка есть ли помеченные на удаление
     */
    private checkDelete () {
        let checked = this.listAll.filter(val => {
            return val.delete;
        });

        this.hasDelete = checked.length > 0;
    }

    /**
     * Удаление компании из рассылки
     * 
     * @param company 
     */
    private removeCompanyFromMailing (company: ICompany) {
        this.dataMailing.sent_to = this.dataMailing.sent_to.filter(item => {
            return item._id != company._id;
        });
    }

    /**
     * Удаление всех компаний из рассылки
     */
    deleteAllCompanyesFromMailing () {
        this.dataMailing.sent_to = [];
    }

    /**
     * Добавление всех компаний в рассылку
     */
    pushAllCompanyesToMailing () {
        this.dataMailing.sent_to = this.comapnyList;
    }

    /**
     * Функция проверяет добавлена ли компания в рассылку
     * 
     * @param company 
     */
    checkSelectedCompany (company: ICompany) {

        for (let c of this.dataMailing.sent_to) {
            if (c._id === company._id) return true;
        }

        return false;
    }

    /**
     * Загрузка файлов
     * 
     * @param files 
     */
    handleFileInput (files: File[]) {

        let loader = this.elemRef.nativeElement.querySelector('#loader-files');
        this.renderer.removeClass(loader, 'hidden');

        this.fileService.upload(files)
            .subscribe(res => {
                let attachments = this.dataMailing.options.attachments;

                for (let file of res) {
                    if (!(attachments.indexOf(file) + 1)) {
                        this.dataMailing.options.attachments.push(file);
                    }
                }

                this.inputFile.nativeElement.value = '';
                this.renderer.addClass(loader, 'hidden');
                },error => {
                    this.renderer.addClass(loader, 'hidden');
                });
    }

    /**
     * Удаление файлов
     * 
     * @param mailing_id 
     * @param file 
     */
    removeFile (mailing_id: string, file: string) {

        let loader = this.elemRef.nativeElement.querySelector('#loader-files');
        this.renderer.removeClass(loader, 'hidden');

        mailing_id = !mailing_id ? '0' : mailing_id;

        let attachments = this.dataMailing.options.attachments;

        this.mailing.removeAttachment(mailing_id, file)
            .subscribe(res => {
                this.dataMailing.options.attachments = attachments.filter(item => {
                    return item != file;
                });
                this.renderer.addClass(loader, 'hidden');
            },error => {
                this.renderer.addClass(loader, 'hidden');
            });
    }

    editor (e) {
        this.dataMailing.options.html = e;
    }

}