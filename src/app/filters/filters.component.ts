import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  teacherTitle = 'за преподавателем';
  subjectTitle = 'за предметом';
  courcesTitle = 'за курсом';
  cources = ['1 курс', '2 курс', '3 курс', '4 курс'];
  subjects = ['ООП', 'Java программирование', 'Python программирование', 'Web программирование'];
  teachers = ['Марчено С. И.', 'Выдрыган-Лаврук А. М.', 'Пидрасый'];

  constructor() { }

  ngOnInit() {
  }

}
