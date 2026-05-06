import { CrudService } from '../../../services/crud.service';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';

@Component({
    selector: 'app-recipe-categories',
    templateUrl: './recipe-categories.component.html',
    styleUrls: ['./recipe-categories.component.css'],
    standalone: true,
    imports: [FormsModule, FilterPipe]
})
export class RecipeCategoriesComponent implements OnInit, OnDestroy {

  apiName = "recipe_categories";
  recipesCategories = signal<any[]>([]);
  searchTerm = signal("");

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.pageTitle.set("Recipes Categories");
    this.getAllRecipesCategories();
  }

  ngOnDestroy(): void {
    this.crudService.pageTitle.set("");
  }

  public getAllRecipesCategories() {
    this.crudService.getAll(this.apiName).subscribe(
      (response: any) => {
        this.recipesCategories.set(response);
      }
    );
  }

  public addRecipeCategory(recipeCategoryName: string) {
    const recipeCategory: any = {
      name: recipeCategoryName
    };
    
    this.crudService.createItem(this.apiName, recipeCategory).subscribe(
      (response: any) => {
        recipeCategory.id = response.id;      
        this.recipesCategories.update(categories => [...categories, recipeCategory]);        
      }
    );
  }

  public deleteRecipeCategory(recipeCategory: any) {
    this.crudService.deleteItem(this.apiName, recipeCategory).subscribe(
      () => {
        this.recipesCategories.update(categories => categories.filter(c => c.id !== recipeCategory.id));
      }
    );
  }

}
