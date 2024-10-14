import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientComponent } from './expedient.component';

describe('ExpedientComponent', () => {
  let component: ExpedientComponent;
  let fixture: ComponentFixture<ExpedientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpedientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpedientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
