import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./components/about/about.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { InfoTaxPageComponent } from "./components/info-tax-page/info-tax-page.component";
import { LearningComponent } from "./components/learning/learning.component";
import { SiteComponent } from "./components/site.component";

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'main' },
    { path: '',
        component: SiteComponent,
        children: [
            { path: 'main', component: MainPageComponent },
            { path: 'tax-info', component: InfoTaxPageComponent },
            { path: 'learn', component: LearningComponent },
            { path: 'about', component: AboutComponent }
        ]
    },
    { path: '**', redirectTo: 'main' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SiteRoutingModule {}