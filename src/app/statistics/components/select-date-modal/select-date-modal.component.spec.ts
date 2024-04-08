import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDateModalComponent } from './select-date-modal.component';

describe('SelectDateModalComponent', () => {
  let component: SelectDateModalComponent;
  let fixture: ComponentFixture<SelectDateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectDateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectDateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
