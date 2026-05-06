import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from 'src/app/core/pipes/duration.pipe';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, DurationPipe]
})
export class OrdersComponent implements OnInit, OnDestroy {

  orderIngredients = signal<any[]>([]);
  nearestMarkets = signal<any[]>([]);
  nearestDrivers = signal<any[]>([]);
  currentOrder = signal<any>({});

  ingredientsOrders: any[] = [];
  mealsOrders: any[] = [];
  orders: any[] = [];

  received = signal<any[]>([]);
  dispatchedToMarket = signal<any[]>([]);
  dispatchedToDriver = signal<any[]>([]);
  onDelivery = signal<any[]>([]);

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.pageTitle.set("Orders");
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.crudService.pageTitle.set("");
  }

  public getIngredientsOrders() {
     return this.crudService.getAll('dashboard/orders').toPromise();
  }

  public getMealsOrders() {
    return this.crudService.getAll('dashboard/meal_orders').toPromise();
  }

  async getOrders() {
    this.ingredientsOrders = await this.getIngredientsOrders();
    this.mealsOrders = await this.getMealsOrders();
    this.orders = this.ingredientsOrders.concat(this.mealsOrders);
    this.orders.sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
    this.setListsOrders();    
  }

  public setListsOrders() {
    const received: any[] = [];
    const dispatchedToMarket: any[] = [];
    const dispatchedToDriver: any[] = [];
    const onDelivery: any[] = [];

    this.orders.forEach(element => {
      if(element.status == 0 || element.status == 5 || element.status == 9 || element.status == 10 || element.status == 13) {
        received.push(element);   
      }
      else if(element.status == 3 || element.status == 4 ||  element.status == 8) {
        dispatchedToMarket.push(element);
      }
      else if(element.status == 6 || element.status == 11) {
        dispatchedToDriver.push(element);
      }
      else if(element.status == 7 || element.status == 12) {
        onDelivery.push(element);
      }
    });

    this.received.set(received);
    this.dispatchedToMarket.set(dispatchedToMarket);
    this.dispatchedToDriver.set(dispatchedToDriver);
    this.onDelivery.set(onDelivery);
  }

  public showOrderIngredients(ingredients: any[]) {
    this.orderIngredients.set(ingredients);    
  }

  public showDetails(order: any) {
    this.currentOrder.set(order);
  }

  public getNearestMarkets(order: any) {
    this.currentOrder.set(order);
    this.crudService.getAll("dashboard/markets/nearest/" + order.id).subscribe(
      (response: any) => {
        if (response) {
          this.nearestMarkets.set(response);
        }                  
      }
    );
  }

  public getNearestDrivers(order: any) {
    this.currentOrder.set(order);

    if (order.status == 10 || order.status == 13) {
      this.crudService.getAll("dashboard/drivers").subscribe(
        (response: any) => {
          if (response) {
            this.nearestDrivers.set(response);   
          }      
        }
      );
    }
    else {
      this.crudService.getAll("dashboard/drivers/nearest/" + order.id).subscribe(
        (response: any) => {
          if (response) {
            this.nearestDrivers.set(response);   
          }      
        }
      );
    }
    
  }

  public dispatchToMarket(form: any) {
    const order = this.currentOrder();
    const item = {
      market_id : form.value.markets
    };
    this.crudService.updateWithouId('dashboard/orders/' + order.id, item).subscribe(
      () => {
        this.received.update(list => list.filter(o => o.id !== order.id));
        this.dispatchedToMarket.update(list => [...list, order]);
      }
    );    
  }

  public dispatchToDriver(form: any) {
    const order = this.currentOrder();
    const item = {
      driver_id : form.value.drivers
    };

    if (order.status == 10 || order.status == 13) {
      this.crudService.updateWithouId('dashboard/meal_orders/' + order.id, item).subscribe(
        () => {
          this.received.update(list => list.filter(o => o.id !== order.id));
          this.dispatchedToDriver.update(list => [...list, order]);
        }
      );
    }

    else {
      this.crudService.updateWithouId('dashboard/orders/' + order.id, item).subscribe(
        () => {
          this.dispatchedToMarket.update(list => list.filter(o => o.id !== order.id));
          this.dispatchedToDriver.update(list => [...list, order]);
        }
      );
    }  
  }

  public rejectOrder(order: any) {    
    this.currentOrder.set(order);
    const item = {
      state : "rejected"
    };
    if (order.status == 0) {
      this.crudService.updateWithouId('dashboard/orders/' + order.id, item).subscribe(
        () => {          
          order.status = 2;
          this.received.update(list => list.filter(o => o.id !== order.id));
        }
      );
    }

    if (order.status == 3 || order.status == 4) {
      this.crudService.updateWithouId('dashboard/orders/' + order.id, item).subscribe(
        () => {          
          order.status = 2;
          this.dispatchedToMarket.update(list => list.filter(o => o.id !== order.id));
        }
      );
    }

    if (order.status == 9 || order.status == 10) {
      this.crudService.updateWithouId('dashboard/meal_orders/' + order.id, item).subscribe(
        () => {          
          order.status = 2;
        }
      );
    }
  }

  public acceptOrder(order: any) {
    this.currentOrder.set(order);
    const item = {
      state : "accepted"
    };    
    this.crudService.updateWithouId('dashboard/meal_orders/' + order.id, item).subscribe(
      () => {
        order.status = 10;
      }
    );    
  }

}
