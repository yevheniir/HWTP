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
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  private _orders: Subject<any[]>;
  orderHandler: EventHandler;
  authorized: string;

  constructor(private httpClient: HttpClient, private hwtpService: HWTPService, private snackBar: MatSnackBar, private router: Router) {
    router.events.subscribe((n: any) => {
      if (!this.authorized && (n.urlAfterRedirects && router.url === '/admin-panel/orders'
      || router.url === '/admin-panel/stuff-manager'
      || router.url === '/admin-panel/stuff-creator' || router.url === '/admin-panel')) {
        setTimeout(() => {
          this.router.navigateByUrl('/password');
        }, 0);
      }
    });
   }

  get orders(): Observable<any[]> {
    if (!this._orders) {
      this._orders = new BehaviorSubject<any[]>([]);

      this.orderHandler = new EventHandler(this._orders, new StuffReducer());

      const headers = new HttpHeaders().set('Auth', this.authorized);

      this.httpClient.get('http://localhost:9090/orders', {headers}).subscribe((orders) => {
        this.orderHandler.use(new Event('ADD_ALL', orders));
      }, (err) => {
        this.authorized = null;
        this.snackBar.open('Случилось непоправимое: ', 'Ошибка', {duration: 2000});
      });
    }

    return this._orders;
  }

  deleteStuff(stuff: Stuff) {

    const headers = new HttpHeaders().set('Auth', this.authorized);

    this.httpClient.patch(`http://localhost:9090/stuff/${stuff.id}`, [true], {headers}).subscribe((res) => {
      this.snackBar.open('Старий продукт: ', 'Снят с продаж', {duration: 2000});
      this.hwtpService.deleteStuff(stuff);
    }, (err) => {
      this.authorized = null;
      this.snackBar.open('Случилось непоправимое: ', 'Ошибка', {duration: 2000});
    });
  }

  addStuff(stuff: Stuff) {

    const headers = new HttpHeaders().set('Auth', this.authorized);

    return this.httpClient.post('http://localhost:9090/stuff', stuff, {headers}).pipe(scan((a, b: Stuff) => {
      this.snackBar.open('Новий продукт: ', 'Добавлен', {duration: 2000});

      this.hwtpService.addStuff(b);
      return b;
    }, stuff), catchError((err) => {
      this.authorized = null;
      this.snackBar.open('Случилось непоправимое: ', 'Ошибка', {duration: 2000});
      return err;
    }));
  }

  deleteOrder(order: any) {

    const headers = new HttpHeaders().set('Auth', this.authorized);

    this.httpClient.delete(`http://localhost:9090/orders/${order.id}`, {headers}).subscribe((res) => {
      this.snackBar.open('Входящий заказ: ', 'Одобрен', {duration: 2000});

      this.orderHandler.use(new Event('DELETE', order));
    }, (err) => {
      this.authorized = null;
      this.snackBar.open('Случилось непоправимое: ', 'Ошибка', {duration: 2000});
    });
  }

  cancelOrder(order: any) {

    const headers = new HttpHeaders().set('Auth', this.authorized);

    this.httpClient.delete(`http://localhost:9090/orders/cancel/${order.id}`, {headers}).subscribe((res) => {
      this.snackBar.open('Входящий заказ: ', 'Отклонен', {duration: 2000});

      this.orderHandler.use(new Event('DELETE', order));
    }, (err) => {
      this.authorized = null;
      this.snackBar.open('Случилось непоправимое: ', 'Ошибка', {duration: 2000});
    });
  }

  commentOrder(order: any, comment: string) {

    const headers = new HttpHeaders().set('Auth', this.authorized);

    this.httpClient.post(`http://localhost:9090/orders/${order.id}`, comment, {headers}).subscribe((res) => {
      this.snackBar.open('Входящий заказ: ', 'Прокомментирован', {duration: 2000});
    }, (err) => {
      this.authorized = null;
      this.snackBar.open('Случилось непоправимое: ', 'Ошибка', {duration: 2000});
    });
  }

  sendPassword(password: string) {
    this.httpClient.post(`http://localhost:9090/password`, password).subscribe((res: string) => {
      if (res) {
        this.authorized = res[0];
        this.router.navigateByUrl('/admin-panel/orders');

        const headers = new HttpHeaders().set('Auth', this.authorized);
        this.httpClient.get('http://localhost:9090/orders', {headers}).subscribe((orders) => {
        this.orderHandler.use(new Event('ADD_ALL', orders));
        }, (err) => {
          this.authorized = null;
          this.snackBar.open('Случилось непоправимое: ', 'Ошибка', {duration: 2000});
        });
        } else {
          this.router.navigateByUrl('/');
        }

    }, (err) => {
      this.router.navigateByUrl('/');
    });
  }

}
