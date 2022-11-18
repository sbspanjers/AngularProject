import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserAddComponent } from './pages/user/user-add/user-add.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'users', component: UserComponent ,  children: [
    {path: ':id/edit', pathMatch: 'full', component: UserEditComponent},
    {path: 'add', pathMatch: 'full', component: UserAddComponent},  
  ]},
  { path: 'about', component: AboutPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
