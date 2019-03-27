import { Injectable } from '@angular/core';
import { Stuff } from './stuff';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { EventHandler } from './EventHandler';
import { Event } from './Event';
import { StuffReducer } from './reducers/stuffReducer';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HWTPService {

  // tslint:disable-next-line:variable-name
  private _stuff: Subject<Stuff[]>;
  buyedStuff = new Subject();
  summ = new Subject();
  amount = new Subject();
  stuffHandler: EventHandler;
  buyedStuffHandler = new EventHandler(this.buyedStuff, new StuffReducer());

  constructor(private httpClient: HttpClient) { }

  get stuff(): Observable<Stuff[]> {
    if (!this._stuff) {
      this._stuff = new BehaviorSubject<Stuff[]>([]);
      this.stuffHandler = new EventHandler(this._stuff, new StuffReducer());
      this.httpClient.get('http://localhost:8080/stuff').subscribe((stuff) => {
        this.stuffHandler.use(new Event('ADD_ALL', stuff));
        this.refreshStats();
      });
    }
    return this._stuff;
  }

  buyStuff(stuff: Stuff, checked: boolean) {
    if (checked) {
      this.buyedStuffHandler.use(new Event('ADD', stuff));
    } else {
      this.buyedStuffHandler.use(new Event('DELETE', stuff));
    }
    this.refreshStats();
  }

  refreshStats() {
    this.summ.next(this.buyedStuffHandler.getArray().reduce((a, b) => {
      return a + b.price;
    }, 0));

    this.amount.next(this.buyedStuffHandler.getArray().length);
  }

  cancelBuy(stuff: Stuff) {
    this.buyedStuffHandler.use(new Event('DELETE', stuff));
    this.refreshStats();
  }

  addOrder(order: any): Observable<Object> {
    order.stuffs = this.buyedStuffHandler.getArray();
    this.buyedStuffHandler.use(new Event('ADD_ALL', []));
    this.refreshStats();
    console.log(order);
    return this.httpClient.post('http://localhost:8080/orders', order);
  }

  deleteStuff(stuff: Stuff) {
    this.stuffHandler.use(new Event('DELETE', stuff));
  }

  addStuff(stuff: Stuff) {
    this.stuffHandler.use(new Event('ADD', stuff));
  }
}
