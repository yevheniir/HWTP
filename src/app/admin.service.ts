import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventHandler } from './EventHandler';
import { Event } from './Event';
import { StuffReducer } from './reducers/stuffReducer';
import { Stuff } from './stuff';
import { HWTPService } from './hwtp.service';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _orders: Subject<any[]>;
  orderHandler: EventHandler;

  constructor(private httpClient: HttpClient, private hwtpService: HWTPService) { }

  get orders(): Observable<any[]> {
    if (!this._orders) {
      this._orders = new BehaviorSubject<any[]>([]);

      this.orderHandler = new EventHandler(this._orders, new StuffReducer());
      this.httpClient.get('http://localhost:8080/orders').subscribe((orders) => {
        this.orderHandler.use(new Event('ADD_ALL', orders));
      });
    }

    return this._orders;
  }

  deleteStuff(stuff: Stuff) {
    this.httpClient.delete(`http://localhost:8080/admin/stuff/${stuff.id}`).subscribe((res) => {
      this.hwtpService.deleteStuff(stuff);
    });
  }

  addStuff(stuff: Stuff) {
    return this.httpClient.post('http://localhost:8080/admin/stuff', stuff).pipe(scan((a, b: Stuff) => {
      this.hwtpService.addStuff(b);
      return b;
    }, stuff));
  }

  deleteOrder(order: any) {
    this.httpClient.delete(`http://localhost:8080/orders/${order.id}`).subscribe((res) => {
      this.orderHandler.use(new Event('DELETE', order));
    });
  }
}
