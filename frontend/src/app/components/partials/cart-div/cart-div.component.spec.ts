import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDivComponent } from './cart-div.component';

describe('CartDivComponent', () => {
  let component: CartDivComponent;
  let fixture: ComponentFixture<CartDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
