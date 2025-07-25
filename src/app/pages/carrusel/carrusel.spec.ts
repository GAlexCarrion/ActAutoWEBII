import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselComponent } from '../carrusel/carrusel';

describe('Carrusel', () => {
  let component: CarruselComponent;
  let fixture: ComponentFixture<CarruselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarruselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
