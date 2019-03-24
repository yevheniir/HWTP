import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStuffManagerComponent } from './admin-stuff-manager.component';

describe('AdminStuffManagerComponent', () => {
  let component: AdminStuffManagerComponent;
  let fixture: ComponentFixture<AdminStuffManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStuffManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStuffManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
