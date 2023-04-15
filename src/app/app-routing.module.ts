import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './view/login/login.component';
import { combineLatest } from 'rxjs';
import { MenuComponent } from './view/menu/menu.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: '', component: LayoutComponent, children:[
    {path: '', component: MenuComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
