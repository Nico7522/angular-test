import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsPerMonthComponent } from './statistics-per-month.component';

describe('StatisticsPerMonthComponent', () => {
  let component: StatisticsPerMonthComponent;
  let fixture: ComponentFixture<StatisticsPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsPerMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
