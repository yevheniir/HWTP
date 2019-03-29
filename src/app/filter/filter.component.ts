import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() title: string;
  @Input() items: any[];
  @Input() type: string;

  @Output() change = new EventEmitter<object>();

  filter = {};

  constructor() {
   }

  ngOnInit() {
    this.filter[this.type] = [];
  }

  changeFilter(event: any, item: any) {
    if (event.checked) {
      this.filter[this.type].push(item);
    } else {
      this.filter[this.type] = this.filter[this.type].filter((el: any) => {
        return el != item;
      });
    }
    this.change.emit(this.filter);
  }

}
