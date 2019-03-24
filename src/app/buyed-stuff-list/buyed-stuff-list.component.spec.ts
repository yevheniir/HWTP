import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyedStuffListComponent } from './buyed-stuff-list.component';

describe('BuyedStuffListComponent', () => {
  let component: BuyedStuffListComponent;
  let fixture: ComponentFixture<BuyedStuffListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyedStuffListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyedStuffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
