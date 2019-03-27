import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stuff } from '../stuff';

@Component({
  selector: 'app-admin-stuff-manager',
  templateUrl: './admin-stuff-manager.component.html',
  styleUrls: ['./admin-stuff-manager.component.scss']
})
export class AdminStuffManagerComponent implements OnInit {

  @Input()
  stuff = [];

  @Output() delete = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  deleteStuff(stuff: Stuff) {
    this.delete.emit(stuff);
  }
}
