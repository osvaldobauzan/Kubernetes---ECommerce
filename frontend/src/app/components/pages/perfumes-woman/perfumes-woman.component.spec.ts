import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumesWomanComponent } from './perfumes-woman.component';

describe('PerfumesWomanComponent', () => {
  let component: PerfumesWomanComponent;
  let fixture: ComponentFixture<PerfumesWomanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfumesWomanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfumesWomanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
