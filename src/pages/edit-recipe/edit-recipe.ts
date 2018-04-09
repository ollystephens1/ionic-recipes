import { Component, OnInit } from '@angular/core';
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../../services/recipes-service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode: string = 'New';
  selectOptions: string[] = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(
    private navParams: NavParams, 
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipesService: RecipesService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode');

    if (this.mode === 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }

    this.initializeForm();
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];

    if (value.ingredients.length) {
      ingredients = value.ingredients.map(name => {
        return { name, amount: 1 }
      });
    }

    if (this.mode === 'Edit') {
      this.recipesService.updateRecipe(this.index, 
        value.title,
        value.description,
        value.difficulty,
        ingredients);
    } else {
      this.recipesService.addRecipe(
        value.title,
        value.description,
        value.difficulty,
        ingredients
      );
    }

    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const length = fArray.length;
            if (length > 0) {
              for (let i = length - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }

              const toast = this.toastCtrl.create({
                message: 'All ingredients deleted',
                duration: 1500,
                position: 'bottom'
              });
  
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() === '' || data.name === null) {
              const toast = this.toastCtrl.create({
                message: 'Please enter a value',
                duration: 1500,
                position: 'bottom'
              });

              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
            
            const toast = this.toastCtrl.create({
              message: 'Item added',
              duration: 1500,
              position: 'bottom'
            });

            toast.present();
          }
        }
      ]
    });
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode === 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      ingredients = this.recipe.ingredients;

      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required))
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }
}
