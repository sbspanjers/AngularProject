import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './pages/user/user.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { UserAddEditComponent } from './pages/user/user-add-edit/user-add-edit.component';
import { FooterComponent } from './footer/footer.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { SingleRecipeComponent } from './pages/recipe/single-recipe/single-recipe.component';
import { RecipeAddEditComponent } from './pages/recipe/recipe-add-edit/recipe-add-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CooklistComponent } from './pages/cooklist/cooklist.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomePageComponent,
    NavbarComponent,
    UserListComponent,
    AboutPageComponent,
    UserAddEditComponent,
    FooterComponent,
    RecipeComponent,
    SingleRecipeComponent,
    RecipeAddEditComponent,
    RegisterComponent,
    LoginComponent,
    CooklistComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
