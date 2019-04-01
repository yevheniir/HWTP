import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Stuff } from '../stuff';


@Component({
  selector: 'app-stuff-list',
  templateUrl: './stuff-list.component.html',
  styleUrls: ['./stuff-list.component.scss']
})
export class StuffListComponent implements OnInit, OnChanges {

  constructor() { }

  @Input()
  stuff: Stuff[];

  @Input()
  buyedStuff = [];

  @Input()
  filter: Map<any, any[]>;

  @Output() buyStuff = new EventEmitter<object>();

  displayedColumns: string[] = ['select', 'subject', 'teacher', 'course', 'semester', 'lab', 'exercise', 'price'];
  dataSource: any;
  selection: any;

  ngOnInit(): void {
    this.selection = new SelectionModel<Stuff>(true, []);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const stuff: SimpleChange = changes.stuff;
    const filter: SimpleChange = changes.filter;

    if (stuff && stuff.previousValue !== stuff.currentValue) {
      this.dataSource = new MatTableDataSource<Stuff>(stuff.currentValue);
    }

    if (filter && filter.previousValue !== filter.currentValue) {

      const newDate = this.stuff.filter((element: Stuff) => {

        let valid = true;
        if (filter.currentValue.size == 0) {
          return true;
        }

        filter.currentValue.forEach((value: string[], key: string) => {
          if (!value.includes(element[key].toString())) {
            valid = false;
          }
        });

        return valid;
      });

      this.dataSource = new MatTableDataSource<Stuff>(newDate);
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.clearSelection() :
        this.dataSource.data.forEach(row => {
          this.selection.select(row);
          this.buyStuff.emit({stuff: row, checked: true});
        });
  }

  checkboxLabel(row?: Stuff): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  toggleStuff(stuff: Stuff, e: any = null) {
    if (e) {
      this.buyStuff.emit({stuff, checked: e.checked});
    } else {
      this.buyStuff.emit({stuff, checked: !this.selection.isSelected(stuff)});
      this.selection.toggle(stuff);
    }
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearSelection() {
    this.dataSource.data.forEach(row => {
      this.selection.select(row);
      this.buyStuff.emit({stuff: row, checked: false});
    });

    this.selection.clear();
  }

}
