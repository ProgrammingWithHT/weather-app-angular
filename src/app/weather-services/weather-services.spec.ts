import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherServices } from './weather-services';

describe('WeatherServices', () => {
  let component: WeatherServices;
  let fixture: ComponentFixture<WeatherServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherServices],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
