import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './pages/user/user.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { UserAddComponent } from './pages/user/user-add/user-add.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomePageComponent,
    NavbarComponent,
    UserListComponent,
    UserEditComponent,
    UserAddComponent,
    AboutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
