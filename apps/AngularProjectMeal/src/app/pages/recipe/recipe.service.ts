import { Injectable } from '@angular/core';
import { Recipe } from '../../../../../../libs/data/src/lib/recipe.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  readonly recipes: Recipe[] = [
    {
      id: '1',
      name: 'Pizza',
      createDate: new Date(Date.now()),
      imgUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.YZSVtwZ9_uBHZyFRv5_6QwHaE8%26pid%3DApi&f=1&ipt=d8743f59305b2a0e4a2ca3ef8347eea5f5a09750eb296142c512b8cd9a52d2b6&ipo=images',
      personCount: 4,
      cookingTime: 20,
      kcal: 120,
      typeMeal: 'Avond eten'
    },
    {
      id: '2',
      name: 'Friet',
      createDate: new Date(Date.now()),
      imgUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.snack77.nl%2Fwp-content%2Fuploads%2F2016%2F04%2FFriet.jpg&f=1&nofb=1&ipt=9fa2efa17d0e3828e56c49a03a454bd640b18c4f27a554abb286c7df595e1be3&ipo=images',
      personCount: 1,
      cookingTime: 9,
      kcal: 200,
      typeMeal: 'Snack'
    },
    {
      id: '3',
      name: 'Stamppot',
      createDate: new Date(Date.now()),
      imgUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmy.pocketmenu.nl%2Fuploads%2Fimages%2Fwebsites%2Fde-buurman%2Fcrop_rectangle%2Fstamppot-1.jpg&f=1&nofb=1&ipt=c371f3dda924bdda2c5072c9b681c4ea48609108fdce2f4538fab98c6dfaf58a&ipo=images',
      personCount: 3,
      cookingTime: 40,
      kcal: 210,
      typeMeal: 'AGV'
    },
    {
      id: '4',
      name: 'Pasta',
      createDate: new Date(Date.now()),
      imgUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthestayathomechef.com%2Fwp-content%2Fuploads%2F2020%2F03%2FPasta-Carbonara-2-3-scaled.jpg&f=1&nofb=1&ipt=0b4f613389b372395105ea6022e7efb7e2818b2821c8f467dbeeb8b20ebfd55b&ipo=images',
      personCount: 2,
      cookingTime: 30,
      kcal: 200,
      typeMeal: 'Italiano'
    },
    {
      id: '5',
      name: 'Nasi',
      createDate: new Date(Date.now()),
      imgUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Felgourmet.s3.amazonaws.com%2Frecetas%2Fshare%2F762af5d037ec12e7c6dbf4fc5d38fde0_3_3_photo.png&f=1&nofb=1&ipt=9c5f8dbf04c7cc69c6e1f00d41f5712a3b805e825e895f5d685faa8333111b21&ipo=images',
      personCount: 4,
      cookingTime: 25,
      kcal: 190,
      typeMeal: 'Oosters'
    }
  ]
  constructor(private httpClient: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    console.log('all repices aangeroepen');
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
    });
    return this.httpClient.get<Recipe[]>('http://localhost:3333/api/data-api/recipe',
    {
      headers: headers,
    });
  }

  getRecipeById(id: string): Recipe {
    console.log('recipeid(' + id + ') aangeroepen');
    return this.recipes.filter((recipe) => recipe.id === id)[0];
  }

  addRecipe(newRecipe: Recipe) {
    console.log('Add recipe ' + newRecipe.name);
    newRecipe.id = (this.recipes.length + 1).toString();
    this.recipes.push(newRecipe)
  }

  editRecipe(updatedRecipe: Recipe) {
    console.log('Edit recipe ' + updatedRecipe.name);
    
    let recipe = this.recipes.find((obj) => obj.id == updatedRecipe.id)
    let index = this.recipes.indexOf(recipe!);
    this.recipes[index] = updatedRecipe;
  }

  deleteRecipe(recipeIdToDelete: string) {
    console.log('Delete recipe(' + recipeIdToDelete + ')');
    let recipe = this.recipes.find((obj) => obj.id == recipeIdToDelete)
    let index = this.recipes.indexOf(recipe!);
    this.recipes.splice(index, 1)
  }
}
