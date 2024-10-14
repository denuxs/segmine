import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysFormComponent } from './surveys-form.component';

describe('SurveysFormComponent', () => {
  let component: SurveysFormComponent;
  let fixture: ComponentFixture<SurveysFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveysFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveysFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
