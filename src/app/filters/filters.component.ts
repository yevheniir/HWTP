import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Stuff } from '../stuff';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {

  @Input() stuff: Stuff[];

  @Output() change = new EventEmitter<object>();

  teacherTitle = 'преподавателем';
  subjectTitle = 'предметом';
  courcesTitle = 'курсом';
  cources = ['1', '2', '3', '4'];
  subjects = [];
  teachers = [];
  filters = new Map<string, any[]>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const stuff: SimpleChange = changes.stuff;

    if (stuff && stuff.previousValue !== stuff.currentValue) {
      const newSub = [];
      const newTeach = [];

      stuff.currentValue.map((a: any) => {
        if (!newSub.includes(a.subject)) {
          newSub.push(a.subject);
        }

        if (!newTeach.includes(a.teacher)) {
          newTeach.push(a.teacher);
        }
      });
      this.subjects = newSub;
      this.teachers = newTeach;
    }
  }

  changeFilter(filter: any) {
    if (filter[Object.keys(filter)[0]].length == 0) {
      this.filters.delete(Object.keys(filter)[0]);
    } else {
      this.filters.set(Object.keys(filter)[0], filter[Object.keys(filter)[0]]);
    }

    this.change.emit(this.filters);
  }

}
