import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url = "http://localhost:8000/api/";
  public pageTitle = signal("");

  constructor(private http: HttpClient) { }

  public getAll(apiName) {    
    return this.http.get(this.url + apiName)
      .pipe(
        map((response: any) => { 
          if (response) {
            return response.data 
          }          
        })
      );
  }

  public createItem(apiName, resource) {
    return this.http.post(this.url + apiName, resource)
      .pipe(
        map((response: any) => { 
          if (response) {
            return response.data 
          } 
        })
      );
  }

  public updateItem(apiName, resource) {
    return this.http.put(this.url + apiName + '/' + resource.id, resource);
  }

  public deleteItem(apiName, resource) {
    return this.http.delete(this.url + apiName + '/' + resource.id);
  }

  public updateWithouId(apiName, resource) {
    return this.http.put(this.url + apiName, resource);
  }
}
