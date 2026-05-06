import { CrudService } from 'src/app/services/crud.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: true,
    imports: []
})
export class NavbarComponent {

  constructor(public crudService: CrudService) { }

}
