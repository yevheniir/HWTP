import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Stuff } from '../stuff';

@Component({
  selector: 'app-buyed-stuff-list',
  templateUrl: './buyed-stuff-list.component.html',
  styleUrls: ['./buyed-stuff-list.component.scss']
})
export class BuyedStuffListComponent implements OnInit {

  @Input()
  stuff: Stuff[];

  @Input()
  removable = true;

  @Output() delete = new EventEmitter<object>();

  displayedColumns: string[];

  dataSource: any;

  constructor() {
   }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Stuff>(this.stuff);

    this.displayedColumns = this.removable ?
    ['subject', 'teacher', 'course', 'semester', 'lab', 'exercise', 'price', 'remove']
    : ['subject', 'teacher', 'course', 'semester', 'lab', 'exercise', 'price'];
  }

  deleteStuff(stuff: Stuff) {
    this.delete.emit(stuff);

    this.stuff = this.stuff.filter((el) => {
      return el !== stuff;
    });

    this.dataSource = new MatTableDataSource<Stuff>(this.stuff);
  }

}
