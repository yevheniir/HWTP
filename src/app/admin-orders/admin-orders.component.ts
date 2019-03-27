import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Stuff } from '../stuff';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit, OnChanges {

  @Input()
  orders: any;

  @Output() delete = new EventEmitter<object>();

  summs = [];

  fullVersion = false;

  panelOpenState = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const orders: SimpleChange = changes.orders;

    if (orders && orders.previousValue !== orders.currentValue) {
      this.orders.forEach((element: any) => {
        this.summs.push(element.stuffs.reduce((a, b: Stuff) => {
          return a + b.price;
        }, 0));
      });
      console.log(this.summs);
    }
  }

  switchScreen() {
    this.fullVersion = !this.fullVersion;
  }

  deleteOrder(order: any) {
    this.delete.emit(order);
  }

}
