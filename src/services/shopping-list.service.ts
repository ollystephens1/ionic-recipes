import { Ingredient } from "../models/ingredient";

export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  addItem(name: string, amount: number): void {
    const newIngredient = new Ingredient(name, amount);
    this.ingredients.push(newIngredient);
  }

  addItems(items: Ingredient[]): void {
    this.ingredients.push(...items);
  }

  getItems(): Ingredient[] {
    return this.ingredients.slice();
  } 

  removeItem(index: number): void {
    this.ingredients.splice(index, 1);
  }
}