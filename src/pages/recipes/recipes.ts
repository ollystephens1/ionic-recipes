import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes-service';
import { RecipePage } from '../recipe/recipe';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(
    private navCtrl: NavController, 
    private recipesService: RecipesService
  ) { }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  newRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New' });
  }

  loadRecipe(recipe: Recipe, idx: number) {
    this.navCtrl.push(RecipePage, { recipe, index: idx });
  }
}
