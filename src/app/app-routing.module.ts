import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: '', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'pages', loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
