import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Stuff } from '../stuff';
import { MatDialog } from '@angular/material';
import { CommentPopupComponent } from '../comment-popup/comment-popup.component';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit, OnChanges {

  @Input()
  orders: any;

  @Output() delete = new EventEmitter<object>();

  @Output() cancel = new EventEmitter<object>();

  @Output() comment = new EventEmitter<object>();

  summs = [];

  fullVersion = false;

  panelOpenState = false;

  constructor(public dialog: MatDialog) { }

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
    }
  }

  openDialog(order: any): void {
    const dialogRef = this.dialog.open(CommentPopupComponent, {
      width: '250px',
      data: {order, comment: ''}
    });

    dialogRef.afterClosed().subscribe(comment => {
      this.comment.emit({order, comment});
    });
  }

  switchScreen() {
    this.fullVersion = !this.fullVersion;
  }

  deleteOrder(order: any) {
    this.delete.emit(order);
  }

  cancelOrder(order: any) {
    this.cancel.emit(order);
  }

  commentOrder(order: any) {
    this.openDialog(order);
  }

}


