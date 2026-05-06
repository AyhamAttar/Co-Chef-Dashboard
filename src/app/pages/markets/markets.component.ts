import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';

@Component({
    selector: 'app-markets',
    templateUrl: './markets.component.html',
    styleUrls: ['./markets.component.css'],
    standalone: true,
    imports: [FormsModule, FilterPipe]
})
export class MarketsComponent implements OnInit, OnDestroy {

  apiName = "markets";
  markets = signal<any[]>([]);
  searchTerm = signal("");
  cities = signal<any[]>([]);
  areas = signal<any[]>([]);
  subareas = signal<any[]>([]);
  selectedCity = signal<string>("");
  selectedArea = signal<string>("");
  selectedSubarea = signal<string>("");
  selectedCityId = signal<any>(null);
  selectedAreaId = signal<any>(null);
  selectedSubareaId = signal<any>(null);
  
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.pageTitle.set("Markets");
    this.getAllMarkets();
    this.getAllCities();
  }

  ngOnDestroy(): void {
    this.crudService.pageTitle.set("");
  }

  public getAllMarkets() {
    this.crudService.getAll(this.apiName).subscribe(
      (response: any) => {
        this.markets.set(response);
      }
    );
  }

  public getAllCities() {
    this.crudService.getAll("addresses").subscribe(
      (response: any) => {
        this.cities.set(response);
        if (response && response.length > 0) {
          const firstCity = response[0];
          this.selectedCity.set(firstCity.name);
          this.selectedCityId.set(firstCity.id);
          this.areas.set(firstCity.areas || []);
          if (firstCity.areas && firstCity.areas.length > 0) {
            const firstArea = firstCity.areas[0];
            this.selectedAreaId.set(firstArea.id);
            this.subareas.set(firstArea.subareas || []);
            if (firstArea.subareas && firstArea.subareas.length > 0) {
              this.selectedSubareaId.set(firstArea.subareas[0].id);
            }
          }
        }
      }
    );
  }

  public onSelectCity() {
    const city = this.cities().find(o => o.name == this.selectedCity());
    if (city) {
      this.areas.set(city.areas || []);
      this.selectedCityId.set(city.id);
    }
  }

  public onSelectArea() {
    const area = this.areas().find(o => o.name == this.selectedArea());
    if (area) {
      this.subareas.set(area.subareas || []);
      this.selectedAreaId.set(area.id);
    }
  }

  public onSelectSubarea() {
    const subarea = this.subareas().find(o => o.name == this.selectedSubarea());
    if (subarea) {
      this.selectedSubareaId.set(subarea.id);
    }
  }

  public addMarket(form: any) {
    if(form.password != form.confirmPassword) {
      return;
    }
    
    const newMarket = {
      "name" : form.name,
      "mobile" : form.mobile,
      "password" : form.password,
      "city_id": this.selectedCityId(),
      "area_id": this.selectedAreaId(),
      "subarea_id": this.selectedSubareaId()
    };    
    
    this.crudService.createItem("market/register", newMarket).subscribe(
      () => {
        this.markets.update(markets => [...markets, newMarket]);           
      }
    );    
  }

  public changeMarketState(market: any) {
    const newState = market.state === 'active' ? 'blocked' : 'active';
    const updatedMarket = { ...market, state: newState };

    this.crudService.updateItem(this.apiName, updatedMarket).subscribe(
      () => {
        this.markets.update(markets => markets.map(m => m.id === market.id ? updatedMarket : m));
      }
    );
  }

}
