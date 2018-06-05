import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'site' },
    { path: 'site', loadChildren: 'app/site/site.module#SiteModule' },
    { path: 'office', loadChildren: 'app/office/office.module#OfficeModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
