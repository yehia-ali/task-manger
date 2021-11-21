import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeisloginComponent } from './homeislogin.component';

describe('HomeisloginComponent', () => {
  let component: HomeisloginComponent;
  let fixture: ComponentFixture<HomeisloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeisloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeisloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
