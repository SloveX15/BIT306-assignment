import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFWAAnalyticsComponent } from './view-fwa-analytics.component';

describe('ViewFWAAnalyticsComponent', () => {
  let component: ViewFWAAnalyticsComponent;
  let fixture: ComponentFixture<ViewFWAAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFWAAnalyticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFWAAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
