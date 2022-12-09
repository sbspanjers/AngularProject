import { Injectable } from '@angular/core';
import { Recipe } from '../../../../../../libs/data/src/lib/recipe.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Step, User } from '../../../../../../libs/data/src';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private httpClient: HttpClient) { }

  private url = 'https://mealtoeat-api.up.railway.app/api/data-api/recipe';

  getToken(): string {
    return JSON.parse(localStorage.getItem('token') || '').token;
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '');
  }

  getRecipes(): Observable<Recipe[]> {
    console.log('all repices aangeroepen');

    const token = this.getToken();
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });
    
    return this.httpClient.get<Recipe[]>(this.url,
    {
      headers: headers,
    });
  }

  getRecipeById(id: string): Observable<Recipe> {
    console.log('recipeid(' + id + ') aangeroepen');
    
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.get<Recipe>(this.url + '/' + id,
    {
      headers: headers,
    });
  }

  addRecipe(newRecipe: Recipe): Observable<any> {
    console.log('Add recipe ' + newRecipe.name);

    const token = this.getToken();
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });
  
    return this.httpClient.post<any>(this.url, newRecipe, { headers: headers});
  }

  editRecipe(updatedRecipe: Recipe): Observable<any> {
    console.log('Edit recipe ' + updatedRecipe.name);

    const token = this.getToken();
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });
    
    return this.httpClient.put<any>(this.url + '/' + updatedRecipe.id, updatedRecipe, 
    {
      headers: headers,
    });
  }

  deleteRecipe(id: string): Observable<any> {
    console.log('Delete recipe(' + id + ')');

    const token = this.getToken();
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.delete<any>(this.url + '/' + id, {
    headers: headers,
    });
  }

  getFavRecipes(): Observable<User> {
    console.log('Get fav recipes');
    
    const token = this.getToken();
    const user = this.getUser();
    
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.get<User>(this.url + '/fav/' + user.id, { headers: headers});
  }

  makeRecipeFav(recipeToFav: Recipe): Observable<Recipe> {
    console.log('Make recipe ' + recipeToFav.name + ' fav');

    const token = this.getToken();
    const user = this.getUser();
    const body = { 
      user, recipeToFav
    };
    
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.put<Recipe>(this.url + '/fav', body, { headers: headers});
  }

  makeRecipNOTFav(recipeToNotFav: Recipe): Observable<any> {
    console.log('Make recipe ' + recipeToNotFav.name + ' NOT fav');

    const token = this.getToken();
    const user = this.getUser();
    const body = { 
      user, recipeToNotFav
    };
    
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `${token}`,
    });

    return this.httpClient.put<any>(this.url + '/noFav', body, { headers: headers});
  }
}
