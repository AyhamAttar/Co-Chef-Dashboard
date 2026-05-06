import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngredientCategoriesComponent } from './ingredient-categories.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('IngredientCategoriesComponent', () => {
  let component: IngredientCategoriesComponent;
  let fixture: ComponentFixture<IngredientCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientCategoriesComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
