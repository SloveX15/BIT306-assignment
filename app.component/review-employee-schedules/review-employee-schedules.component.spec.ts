import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEmployeeSchedulesComponent } from './review-employee-schedules.component';

describe('ReviewEmployeeSchedulesComponent', () => {
  let component: ReviewEmployeeSchedulesComponent;
  let fixture: ComponentFixture<ReviewEmployeeSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewEmployeeSchedulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewEmployeeSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
