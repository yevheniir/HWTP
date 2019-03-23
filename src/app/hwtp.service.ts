import { Injectable } from '@angular/core';
import { Stuff } from './stuff';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { EventHandler } from './EventHandler';
import { Event } from './Event';
import { StuffReducer } from './reducers/stuffReducer';

@Injectable({
  providedIn: 'root'
})
export class HWTPService {

  stuff: Stuff[] = [
    {subject: 'Java', teacher: 'Марченко', cource: 3, semester: 2, lab: 1, exercise: 1, price: 10, id: 1},
    {subject: 'Java', teacher: 'Марченко', cource: 3, semester: 2, lab: 1, exercise: 2, price: 10, id: 2},
    {subject: 'Java', teacher: 'Марченко', cource: 3, semester: 2, lab: 1, exercise: 3, price: 10, id: 3},
    {subject: 'Java', teacher: 'Марченко', cource: 3, semester: 2, lab: 1, exercise: 4, price: 10, id: 4},
    {subject: 'Java', teacher: 'Марченко', cource: 3, semester: 2, lab: 1, exercise: 5, price: 10, id: 5},
    {subject: 'Java', teacher: 'Марченко', cource: 3, semester: 2, lab: 1, exercise: 6, price: 10, id: 6}
  ];

  // buyedStuff = new Set<Stuff>([]);

  buyedStuff = new Subject();

  summ = new Subject();
  amount = new Subject();
  buyedStuffHandler = new EventHandler(this.buyedStuff, new StuffReducer());

  constructor() {
    // this.buyedStuffHandler.use(new Event('ADD_ALL', []));

    this.refreshStats();
   }

  buyStuff(stuff: Stuff, checked: boolean) {
    console.log(stuff, checked);
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
}
