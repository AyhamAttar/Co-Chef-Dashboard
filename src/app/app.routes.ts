import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent),
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent),
  },
  {
    path: 'recipes',
    loadComponent: () => import('./pages/recipes/recipes.component').then(m => m.RecipesComponent),
  },
  {
    path: 'store',
    loadComponent: () => import('./pages/store/store.component').then(m => m.StoreComponent),
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent),
  },
  {
    path: 'categories/recipes',
    loadComponent: () => import('./pages/categories/recipe-categories/recipe-categories.component').then(m => m.RecipeCategoriesComponent),
  },
  {
    path: 'categories/ingredients',
    loadComponent: () => import('./pages/categories/ingredient-categories/ingredient-categories.component').then(m => m.IngredientCategoriesComponent),
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
  },
  {
    path: 'tags',
    loadComponent: () => import('./pages/tags/tags.component').then(m => m.TagsComponent),
  },
  {
    path: 'admins',
    loadComponent: () => import('./pages/admins/admins.component').then(m => m.AdminsComponent),
  },
  {
    path: 'drivers',
    loadComponent: () => import('./pages/drivers/drivers.component').then(m => m.DriversComponent),
  },
  {
    path: 'chefs',
    loadComponent: () => import('./pages/chefs/chefs.component').then(m => m.ChefsComponent),
  },
  {
    path: 'markets',
    loadComponent: () => import('./pages/markets/markets.component').then(m => m.MarketsComponent),
  },
  {
    path: 'suggestions',
    loadComponent: () => import('./pages/suggestions/suggestions.component').then(m => m.SuggestionsComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
