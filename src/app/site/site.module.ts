//Modules
import { NgModule } from "@angular/core";
import { SiteRoutingModule } from "./site-routing.module";
import { SharedModule } from "../core/shared.module";

//Components
import { SiteComponent } from "./components/site.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { InfoTaxPageComponent } from "./components/info-tax-page/info-tax-page.component";
import { LearningComponent } from "./components/learning/learning.component";
import { AboutComponent } from "./components/about/about.component";

@NgModule({
    declarations: [
        SiteComponent,
        MainPageComponent,
        InfoTaxPageComponent,
        LearningComponent,
        AboutComponent
    ],
    imports: [
        SharedModule,
        SiteRoutingModule
    ]
})
export class SiteModule {}
