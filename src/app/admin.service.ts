import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventHandler } from './EventHandler';
import { Event } from './Event';
import { StuffReducer } from './reducers/stuffReducer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _orders: Subject<any[]>;
  orderHandler: EventHandler;

  constructor(private httpClient: HttpClient) { }

  get orders(): Observable<any[]> {
    if (!this._orders) {
      this._orders = new BehaviorSubject<any[]>([]);

      this.orderHandler = new EventHandler(this._orders, new StuffReducer());
      this.httpClient.get('http://localhost:8080/orders').subscribe((orders) => {
        this.orderHandler.use(new Event('ADD_ALL', orders));
      });

      this.httpClient.get('http://localhost:8080/image-response-entity').subscribe((orders) => {
        console.log(orders);
      });
    }

    return this._orders;
  }
}
