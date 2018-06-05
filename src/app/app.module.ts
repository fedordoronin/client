//Modules
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SiteModule } from './site/site.module';
import { OfficeModule } from "./office/office.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";

//Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      CoreModule,
      AppRoutingModule,
      SiteModule,
      OfficeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
