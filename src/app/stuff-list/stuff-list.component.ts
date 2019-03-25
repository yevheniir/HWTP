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

  @Output() buyStuff = new EventEmitter<object>();

  displayedColumns: string[] = ['select', 'subject', 'teacher', 'course', 'semester', 'lab', 'exercise', 'price'];
  dataSource: any;
  selection: any;

  ngOnInit(): void {
    console.log('stuff list', this.stuff);
    // this.dataSource = new MatTableDataSource<Stuff>(this.stuff);
    this.selection = new SelectionModel<Stuff>(true, []);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const stuff: SimpleChange = changes.stuff;

    if (stuff && stuff.previousValue !== stuff.currentValue) {
      this.dataSource = new MatTableDataSource<Stuff>(stuff.currentValue);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.clearSelection() :
        this.dataSource.data.forEach(row => {
          this.selection.select(row);
          this.buyStuff.emit({stuff: row, checked: true});
        });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Stuff): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`; //row ${row.position + 1}
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
