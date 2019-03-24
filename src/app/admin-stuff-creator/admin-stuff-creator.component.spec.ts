import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStuffCreatorComponent } from './admin-stuff-creator.component';

describe('AdminStuffCreatorComponent', () => {
  let component: AdminStuffCreatorComponent;
  let fixture: ComponentFixture<AdminStuffCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStuffCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStuffCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
