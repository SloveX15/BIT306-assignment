import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnScheduleComponent } from './own-schedule.component';

describe('OwnScheduleComponent', () => {
  let component: OwnScheduleComponent;
  let fixture: ComponentFixture<OwnScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
