import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAsProductComponent } from './sales-as-product.component';

describe('SalesAsProductComponent', () => {
  let component: SalesAsProductComponent;
  let fixture: ComponentFixture<SalesAsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesAsProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
