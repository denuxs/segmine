import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesCreateComponent } from './sites-create.component';

describe('SitesCreateComponent', () => {
  let component: SitesCreateComponent;
  let fixture: ComponentFixture<SitesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitesCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SitesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
