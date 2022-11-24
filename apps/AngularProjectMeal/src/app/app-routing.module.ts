import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RecipeAddEditComponent } from './pages/recipe/recipe-add-edit/recipe-add-edit.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { SingleRecipeComponent } from './pages/recipe/single-recipe/single-recipe.component';
import { UserAddEditComponent } from './pages/user/user-add-edit/user-add-edit.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'users', component: UserComponent },
  { path: 'users/:id/edit', component: UserAddEditComponent },
  { path: 'users/add', component: UserAddEditComponent },  
  { path: 'recipes', component: RecipeComponent},
  { path: 'recipes/add', component: RecipeAddEditComponent},
  { path: 'recipes/:id', component: SingleRecipeComponent },
  { path: 'recipes/:id/edit', component: RecipeAddEditComponent },
  { path: 'about', component: AboutPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
