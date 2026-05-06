import { CrudService } from '../../services/crud.service';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';

@Component({
    selector: 'app-admins',
    templateUrl: './admins.component.html',
    styleUrls: ['./admins.component.css'],
    standalone: true,
    imports: [FormsModule, FilterPipe]
})
export class AdminsComponent implements OnInit, OnDestroy {

  apiName = "admins";
  admins = signal<any[]>([]);
  searchTerm = signal("");

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.pageTitle.set("Admins");
    this.getAllAdmins();
  }

  ngOnDestroy(): void {
    this.crudService.pageTitle.set("");
  }

  public getAllAdmins() {
    this.crudService.getAll(this.apiName).subscribe(
      (response: any) => {
        this.admins.set(response);
      }
    );
  }

  public addAdmin(form: any) {
    if(form.password != form.confirmPassword) {
      return;
    }

    const newAdmin = {
      "name" : form.name,
      "mobile" : form.mobile,
      "birth" : form.birth,
      "gender" : form.gender,
      "password" : form.password
    };
    
    this.crudService.createItem("admin/register", newAdmin).subscribe(
      () => {
        this.admins.update(admins => [...admins, newAdmin]);
      }
    );    
  }

  public changeAdminState(admin: any) {
    const newState = admin.state === 'active' ? 'blocked' : 'active';
    const updatedAdmin = { ...admin, state: newState };

    this.crudService.updateItem(this.apiName, updatedAdmin).subscribe(
      () => {
        this.admins.update(admins => admins.map(a => a.id === admin.id ? updatedAdmin : a));
      }
    );
  }

}
