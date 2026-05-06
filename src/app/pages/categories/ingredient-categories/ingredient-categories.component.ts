import { CrudService } from '../../../services/crud.service';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';

@Component({
    selector: 'app-ingredient-categories',
    templateUrl: './ingredient-categories.component.html',
    styleUrls: ['./ingredient-categories.component.css'],
    standalone: true,
    imports: [FormsModule, FilterPipe]
})
export class IngredientCategoriesComponent implements OnInit, OnDestroy {

  apiName = "ingredient_categories";
  ingredientsCategories = signal<any[]>([]);
  searchTerm = signal("");
  
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.pageTitle.set("Ingredients Categories");
    this.getAllIngredientsCategories();
  }

  ngOnDestroy(): void {
    this.crudService.pageTitle.set("");
  }

  public getAllIngredientsCategories() {
    this.crudService.getAll(this.apiName).subscribe(
      (response: any) => {
        this.ingredientsCategories.set(response);
      }
    );
  }

  public addIngredientCategory(ingredientCategoryName: string) {
    const ingredientCategory: any = {
      name: ingredientCategoryName
    };
    
    this.crudService.createItem(this.apiName, ingredientCategory).subscribe(
      (response: any) => {
        ingredientCategory.id = response.id;      
        this.ingredientsCategories.update(categories => [...categories, ingredientCategory]);       
      }
    );
  }

  public deleteIngredientCategory(ingredientCategory: any) {
    this.crudService.deleteItem(this.apiName, ingredientCategory).subscribe(
      () => {
        this.ingredientsCategories.update(categories => categories.filter(c => c.id !== ingredientCategory.id));
      }
    );
  }
}
