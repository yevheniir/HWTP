import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventHandler } from './EventHandler';
import { Event } from './Event';
import { StuffReducer } from './reducers/stuffReducer';
import { Stuff } from './stuff';
import { HWTPService } from './hwtp.service';
import { scan, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _orders: Subject<any[]>;
  orderHandler: EventHandler;

  constructor(private httpClient: HttpClient, private hwtpService: HWTPService, private snackBar: MatSnackBar) {
    setTimeout(() => {
      this.snackBar.open('Старий продукт: ', 'Снят с продаж', {duration: 2000});
    }, 2000);
   }

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
      this.snackBar.open('Старий продукт: ', 'Снят с продаж', {duration: 2000});

      this.hwtpService.deleteStuff(stuff);
    }, (err) => {
      this.snackBar.open('Случилось непоправимое: ', 'Ошибка', {duration: 2000});
    });
  }

  addStuff(stuff: Stuff) {
    return this.httpClient.post('http://localhost:8080/stuff', stuff).pipe(scan((a, b: Stuff) => {
      this.snackBar.open('Новий продукт: ', 'Добавлен', {duration: 2000});

      this.hwtpService.addStuff(b);
      return b;
    }, stuff), catchError((err) => {
      this.snackBar.open('Случилось непоправимое: ', 'Ошибка', {duration: 2000});
      return err;
    }));
  }

  deleteOrder(order: any) {
    this.httpClient.delete(`http://localhost:8080/orders/${order.id}`).subscribe((res) => {
      this.snackBar.open('Входящий заказ: ', 'Одобрен', {duration: 2000});

      this.orderHandler.use(new Event('DELETE', order));
    }, (err) => {
      this.snackBar.open('Случилось непоправимое: ', 'Ошибка', {duration: 2000});
    });
  }

  cancelOrder(order: any) {
    this.httpClient.delete(`http://localhost:8080/orders/cancel/${order.id}`).subscribe((res) => {
      this.snackBar.open('Входящий заказ: ', 'Отклонен', {duration: 2000});

      this.orderHandler.use(new Event('DELETE', order));
    }, (err) => {
      this.snackBar.open('Случилось непоправимое: ', 'Ошибка', {duration: 2000});
    });
  }

  commentOrder(order: any, comment: string) {
    this.httpClient.post(`http://localhost:8080/orders/${order.id}`, comment).subscribe((res) => {
      this.snackBar.open('Входящий заказ: ', 'Прокомментирован', {duration: 2000});
    }, (err) => {
      this.snackBar.open('Случилось непоправимое: ', 'Ошибка', {duration: 2000});
    });
  }

}
