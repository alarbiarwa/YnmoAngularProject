import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Goulash','Is a pie consisting of layers of phyllo dough with a mixture of minced beef seasoned with spices, and onion.','https://www.themediterraneandish.com/wp-content/uploads/2015/10/phyllo-meat-pie-recipe-11.jpg',
  //     [
  //       new Ingredient('Phyllo dough ', 1),
  //       new Ingredient('Beef', 2)
  //     ]),

  //   new Recipe('Koshari','Is a bowl of simple pantry staples: spiced lentils and rice, combined with chickpeas and small pasta.  All smothered in a tomato sauce that\'s been spiked with vinegar, it\'s topped with, crispy thin fried onion rings.','https://www.foodfashionparty.com/wp-content/uploads/2022/01/koshari-5-scaled.jpg',
  //     [
  //       new Ingredient('Small pasta', 2),
  //       new Ingredient('Tomato', 5)
  //     ]),

  //     new Recipe('Hawawshi','Is a dough (or pita) stuffed with a mixture of ground beef that is seasoned with spices, onions, garlic, hot peppers, and fresh herbs.','https://www.themediterraneandish.com/wp-content/uploads/2020/11/hawawshi-recipe-6.jpg',
  //     [
  //       new Ingredient('Pita', 6),
  //       new Ingredient('Herbs', 1)
  //     ])

  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
