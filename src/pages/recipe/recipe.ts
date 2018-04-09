import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipesService } from '../../services/recipes-service';


@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(
    public navParams: NavParams, 
    public navCtrl: NavController,
    private shoppingListService: ShoppingListService,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.index });
  }

  onAddIngredients() {
    this.shoppingListService.addItems(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
}
