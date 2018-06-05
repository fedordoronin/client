import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class NotifyService {

    private event: EventEmitter<{ text:string, type: string }> = new EventEmitter;

    public readonly types = {
        TYPE_DANGER : 'alert-danger',
        TYPE_WARNING : 'alert-warning',
        TYPE_INFO : 'alert-info',
        TYPE_SUCCESS : 'alert-success'
    };

    /**
     * 
     * @param text Текст
     * @param type Тип NotifyService.types
     */
    public notify (text: string, type: string = this.types.TYPE_INFO) {
        this.event.emit({ text, type });
    }

    /**
     * Возвращает объект EventEmitter
     */
    public e (): EventEmitter<{ text:string, type: string }> {
        return this.event;
    }
}