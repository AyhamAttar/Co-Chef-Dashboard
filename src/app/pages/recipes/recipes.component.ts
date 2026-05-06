import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudService } from 'src/app/services/crud.service';
import { DurationPipe } from 'src/app/core/pipes/duration.pipe';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
    standalone: true,
    imports: [CommonModule, DurationPipe]
})
export class RecipesComponent implements OnInit, OnDestroy {

  url = "http://localhost:8000/";
  apiName = "dashboard/recipes";
  recipes = signal<any[]>([]);
  currentRecipe = signal<any>({});
  showIngredients = signal(false);

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.pageTitle.set("Recipes");
    this.getAllRecipes();
  }

  ngOnDestroy(): void {
    this.crudService.pageTitle.set("");
  }

  public getAllRecipes() {
    this.crudService.getAll(this.apiName).subscribe(
      (response: any) => {
        this.recipes.set(response);        
      }
    );
  }

  public showRecipe(recipe: any) {
    this.currentRecipe.set(recipe);
  }

  public showRecipeIngredients() {
    this.showIngredients.update(show => !show);
  }

  public acceptRecipe(recipe: any) {
    const item = {
      id: recipe.id,
      state: "accepted"
    };
    this.crudService.updateItem(this.apiName, item).subscribe(
      () => {
        this.recipes.update(recipes => recipes.filter(r => r.id !== recipe.id));
      }
    );
  }

  public rejectRecipe(recipe: any) {
    const item = {
      id: recipe.id,
      state: "rejected"
    };
    this.crudService.updateItem(this.apiName, item).subscribe(
      () => {
        this.recipes.update(recipes => recipes.filter(r => r.id !== recipe.id));
      }
    );
  }
}
