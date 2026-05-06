import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule]
})
export class StoreComponent implements OnInit, OnDestroy {

  url = "http://localhost:8000/";
  apiName = "dashboard/store";
  ingredients = signal<any[]>([]);
  categories = signal<any[]>([]);
  amounts = signal<any[]>([]);
  currentIngredient = signal<any>({});
  selectedCategoryName = signal("");
  selectedPhoto: File | null = null;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.pageTitle.set("Store");
    this.getAllIngredients();    
    this.getAllCategories();
    this.getAllAmounts();
  }

  ngOnDestroy(): void {
    this.crudService.pageTitle.set("");
  }

  public getAllIngredients() {
    this.crudService.getAll(this.apiName).subscribe(
      (response: any) => {
        this.ingredients.set(response);        
      }
    );
  }

  public getAllCategories() {
    this.crudService.getAll('ingredient_categories').subscribe(
      (response: any) => {
        this.categories.set(response);           
      }
    );
  }

  public getAllAmounts() {
    this.crudService.getAll('dashboard/amounts').subscribe(
      (response: any) => {
        this.amounts.set(response);           
      }
    );
  }

  public showIngredient(ingredient: any) {
    this.currentIngredient.set(ingredient);
  }

  public editIngredient(ingredient: any, form: any) {
    const formValues = form.value;    
    const item = {
      id: ingredient.id,
      name: formValues.name,
      price: formValues.price,
      calories: formValues.calories,
      ingredient_category_id: formValues.category
    };     

    this.crudService.updateItem(this.apiName, item).subscribe(
      () => {
        this.getAllIngredients();        
      }
    );
  }

  public uploadFile(event: any) {
    this.selectedPhoto = event.target.files[0];    
  }

  public addIngredient(form: any) {
    const formValues = form.value;    
    const formData = new FormData();

    formData.append('name', formValues.name);
    if (this.selectedPhoto) {
      formData.append('image', this.selectedPhoto, this.selectedPhoto.name);
    }
    formData.append('price', formValues.price);
    formData.append('calories', formValues.calories);
    formData.append('ingredient_category_id', formValues.category);
    formData.append('amount_id', formValues.amount);

    this.crudService.createItem(this.apiName, formData).subscribe(
      () => {        
        this.getAllIngredients();
      }
    );    
  }

  public deleteIngredient(ingredient: any) {
    this.crudService.deleteItem(this.apiName, ingredient).subscribe(
      () => {
        this.ingredients.update(list => list.filter(i => i.id !== ingredient.id));
      }
    );
  }
}
