import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { OfficeRoutingModule } from "./office-routing.module";
import { SharedModule } from "../core/shared.module";
import "froala-editor/js/froala_editor.pkgd.min.js";

//Components
import { LoginComponent } from "./components/login/login.component";
import { TaxComponent } from './components/tax/tax.component';
import { CompanyComponent } from './components/company/company.component';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorPageComponent } from './components/errorPage/errorPage.component';
import { FormCompanyComponent } from './components/company/form.component';
import { FormTaxComponent } from './components/tax/form.component';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { PagerComponent } from "./components/pager/pager.component";
import { ModalInfoComponent } from './components/tax/modal-info.component';
import { NewsComponent } from './components/news/news.component';
import { MailingComponent } from "./components/mailing/mailing.component";
import { NotifyComponent } from "./components/notify/notify.component";

//Guards
import { AuthGuard } from "./guards/auth.guard";
import { AccessAssociateGuard } from "./guards/accessAssociate.guard";
import { AccessAdminGuard } from "./guards/accessAdmin.guard";
import { CheckErrorGuard } from "./guards/checkError.guard";

//Services
import { UserService } from "./components/user/user.service";
import { PagerService } from "./components/pager/pager.service";
import { MessageService } from "./services/message.service";
import { AuthService } from "./services/auth.service";
import { NewsService } from "./components/news/news.service";
import { TaxService } from "./components/tax/tax.service";
import { CompanyService } from "./components/company/company.service";
import { AuthenticationInterceptor } from "./interceptors/authentication.interceptor";

//Interceptors
import * as loadUserInterceptor from "./interceptors/loadUser.interceptor";
import { MailingService } from "./components/mailing/mailing.service";
import { FileService } from "./services/file.service";
import { ErrorService } from "./services/error.service";

@NgModule({
    imports: [
        SharedModule,
        OfficeRoutingModule
    ],
    declarations: [
        LoginComponent,
        TaxComponent,
        CompanyComponent,
        UserComponent,
        NavbarComponent,
        DashboardComponent,
        ErrorPageComponent,
        PageLoaderComponent,
        PagerComponent,
        NewsComponent,
        FormCompanyComponent,
        FormTaxComponent,
        ModalInfoComponent,
        MailingComponent,
        NotifyComponent
    ],
    providers: [
        AuthGuard,
        AccessAdminGuard,
        AccessAssociateGuard,
        CheckErrorGuard,
        CompanyService,
        PagerService,
        TaxService,
        UserService,
        NewsService,
        MessageService,
        MailingService,
        FileService,
        {
            provide: APP_INITIALIZER,
            useFactory: loadUserInterceptor.loadUser,
            deps: [ AuthService ],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true,
        }
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class OfficeModule {}