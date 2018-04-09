import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe';


@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams) {}

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }
}
