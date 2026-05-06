import { Component } from '@angular/core';
import { HomeComponent } from './layout/home/home.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [HomeComponent]
})
export class AppComponent {
  title = 'co-chef-frontend';
}
