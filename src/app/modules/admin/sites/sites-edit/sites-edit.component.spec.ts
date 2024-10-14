import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesEditComponent } from './sites-edit.component';

describe('SitesEditComponent', () => {
  let component: SitesEditComponent;
  let fixture: ComponentFixture<SitesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitesEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SitesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
