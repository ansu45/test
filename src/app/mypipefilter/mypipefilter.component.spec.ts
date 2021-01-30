import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypipefilterComponent } from './mypipefilter.component';

describe('MypipefilterComponent', () => {
  let component: MypipefilterComponent;
  let fixture: ComponentFixture<MypipefilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypipefilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypipefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
