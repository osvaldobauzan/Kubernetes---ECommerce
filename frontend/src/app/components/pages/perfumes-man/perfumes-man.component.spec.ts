import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumesManComponent } from './perfumes-man.component';

describe('PerfumesManComponent', () => {
  let component: PerfumesManComponent;
  let fixture: ComponentFixture<PerfumesManComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfumesManComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfumesManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
