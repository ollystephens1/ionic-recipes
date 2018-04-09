import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";

export class RecipesService {
  private recipes: Recipe[] = [];

  addRecipe(
    title: string, 
    description: string, 
    difficulty: string, 
    ingredients: Ingredient[]): void {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));

    console.log(this.recipes);
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  updateRecipe(
    idx: number,
    title: string,
    description: string,
    difficulty: string,
    ingredients: Ingredient[]
  ): void {
    this.recipes[idx] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe(idx: number): void {
    this.recipes.splice(idx, 1);
  }
}