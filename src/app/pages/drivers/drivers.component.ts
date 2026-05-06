import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';

@Component({
    selector: 'app-drivers',
    templateUrl: './drivers.component.html',
    styleUrls: ['./drivers.component.css'],
    standalone: true,
    imports: [FormsModule, FilterPipe]
})
export class DriversComponent implements OnInit, OnDestroy {

  apiName = "drivers";
  drivers = signal<any[]>([]);
  searchTerm = signal("");
  
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.pageTitle.set("Drivers");
    this.getAllDrivers();
  }

  ngOnDestroy(): void {
    this.crudService.pageTitle.set("");
  }

  public getAllDrivers() {
    this.crudService.getAll(this.apiName).subscribe(
      (response: any) => {
        this.drivers.set(response);
      }
    );
  }

  public addDriver(form: any) {
    if(form.password != form.confirmPassword) {
      return;
    }

    const newDriver = {
      "name" : form.name,
      "mobile" : form.mobile,
      "birth" : form.birth,
      "password" : form.password
    };
    
    this.crudService.createItem("driver/register", newDriver).subscribe(
      () => {
        this.drivers.update(drivers => [...drivers, newDriver]);
      }
    );    
  }

  public changeDriverState(driver: any) {
    const newState = driver.state === 'active' ? 'blocked' : 'active';
    const updatedDriver = { ...driver, state: newState };

    this.crudService.updateItem(this.apiName, updatedDriver).subscribe(
      () => {
        this.drivers.update(drivers => drivers.map(d => d.id === driver.id ? updatedDriver : d));
      }
    );
  }

}
