import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginxComponent } from './loginx.component';

describe('LoginxComponent', () => {
  let component: LoginxComponent;
  let fixture: ComponentFixture<LoginxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
