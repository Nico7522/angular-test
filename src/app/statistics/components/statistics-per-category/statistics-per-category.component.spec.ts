import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsPerCategoryComponent } from './statistics-per-category.component';

describe('StatisticsPerCategoryComponent', () => {
  let component: StatisticsPerCategoryComponent;
  let fixture: ComponentFixture<StatisticsPerCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsPerCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsPerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
