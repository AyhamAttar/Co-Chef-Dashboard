import { CrudService } from '../../services/crud.service';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    standalone: true,
    imports: [FormsModule, FilterPipe]
})
export class UsersComponent implements OnInit, OnDestroy {

  apiName = "users";
  users = signal<any[]>([]);
  searchTerm = signal("");

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.pageTitle.set("Users");
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    this.crudService.pageTitle.set("");
  }

  public getAllUsers() {
    this.crudService.getAll(this.apiName).subscribe(
      (response: any) => {
        this.users.set(response);
      }
    );
  }

  public changeUserState(user: any) {
    const newState = user.state === 'active' ? 'blocked' : 'active';
    const updatedUser = { ...user, state: newState };
    
    this.crudService.updateItem(this.apiName, updatedUser).subscribe(
      () => {
        this.users.update(users => users.map(u => u.id === user.id ? updatedUser : u));
      }
    );
  }

  public addChef(user: any) {
    const item = { "chef_id": 1 };
    this.crudService.updateWithouId("users/" + user.id + "/chef/add", item).subscribe(
      () => {
        this.getAllUsers();
      }
    );
  }

}
