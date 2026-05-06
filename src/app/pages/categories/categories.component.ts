import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css'],
    standalone: true,
    imports: [RouterModule]
})
export class CategoriesComponent {

  searchTerm = signal("");

}
