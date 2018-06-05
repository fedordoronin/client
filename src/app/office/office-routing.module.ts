import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NewsComponent } from "./components/news/news.component";
import { AccessAssociateGuard } from "./guards/accessAssociate.guard";
import { CompanyComponent } from "./components/company/company.component";
import { AccessAdminGuard } from "./guards/accessAdmin.guard";
import { TaxComponent } from "./components/tax/tax.component";
import { UserComponent } from "./components/user/user.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { ErrorPageComponent } from "./components/errorPage/errorPage.component";
import { CheckErrorGuard } from "./guards/checkError.guard";
import { MailingComponent } from "./components/mailing/mailing.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', pathMatch: 'full', redirectTo: 'company' },
    { path: '', component: DashboardComponent, canActivate: [AuthGuard],
        children: [
            { path: 'tax/:id', component: TaxComponent },
            { path: 'users', canActivate: [AccessAssociateGuard], component: UserComponent },
            { path: 'company', component: CompanyComponent },
            { path: 'company/:userId', canActivate: [AccessAssociateGuard], component: CompanyComponent },
            { path: 'news', canActivate: [AccessAdminGuard], component: NewsComponent },
            { path: 'news/:id', canActivate: [AccessAdminGuard], component: NewsComponent },
            { path: 'mailing', canActivate: [AccessAssociateGuard], component: MailingComponent }
        ]
    },
    { path: 'error', component: ErrorPageComponent, canActivate: [CheckErrorGuard] },
    { path: '**', redirectTo: 'company' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class OfficeRoutingModule{}