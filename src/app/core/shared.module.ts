//Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { QuillModule } from "ngx-quill";

//Pipes
import { PermissionPipe } from "../office/pipes/permission.pipe";
import { AccessPipe } from "../office/pipes/access.pipe";
import { SummPipe } from "../office/pipes/summ.pipe";
import { MonthPipe } from "../office/pipes/month.pipe";
import { RolePipe } from "../office/pipes/role.pipe";
import { PositionPipe } from "../office/pipes/position.pipe";
import { TitlePipe } from "../office/pipes/title.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        QuillModule,
        NgbModule.forRoot(),
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    declarations: [
        MonthPipe,
        PermissionPipe,
        AccessPipe,
        RolePipe,
        PositionPipe,
        SummPipe,
        TitlePipe
    ],
    exports: [
        MonthPipe,
        PermissionPipe,
        AccessPipe,
        RolePipe,
        PositionPipe,
        SummPipe,
        TitlePipe,
        CommonModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        FroalaEditorModule,
        FroalaViewModule,
        QuillModule
    ]
})
export class SharedModule {}