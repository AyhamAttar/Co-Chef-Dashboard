import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../../services/crud.service';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';

@Component({
    selector: 'app-chefs',
    templateUrl: './chefs.component.html',
    styleUrls: ['./chefs.component.css'],
    standalone: true,
    imports: [FormsModule, FilterPipe]
})
export class ChefsComponent implements OnInit, OnDestroy {

  apiName = "chefs";
  chefs = signal<any[]>([]);
  searchTerm = signal("");
  
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.pageTitle.set("Chefs");
    this.getAllChefs();
  }

  ngOnDestroy(): void {
    this.crudService.pageTitle.set("");
  }

  public getAllChefs() {
    this.crudService.getAll(this.apiName).subscribe(
      (response: any) => {
        this.chefs.set(response);
      }
    );
  }

  public removeChef(user: any) {
    const item = { "chef_id": null };
    
    this.crudService.updateWithouId("users/" + user.id + "/chef/remove", item).subscribe(
      () => {   
        this.chefs.update(chefs => chefs.filter(c => c.id !== user.chef_id));
      }
    );
  }

}
