import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumesUnisexComponent } from './perfumes-unisex.component';

describe('PerfumesUnisexComponent', () => {
  let component: PerfumesUnisexComponent;
  let fixture: ComponentFixture<PerfumesUnisexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfumesUnisexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfumesUnisexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
