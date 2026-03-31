import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherResponse, WeatherServices } from './weather-services/weather-services';
// import {NgClass } from "../../node_modules/@angular/common/types/_common_module-chunk";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('weather-app');

  weatherServices = inject(WeatherServices);

  weather = signal<WeatherResponse | null>(null);

  ngOnInit() {
    this.getCurrentLocationWeather();

    // (error) => {
    //   console.log('Denied, loading default city...');
    //   this.getWeatherDetails('Lahore'); // fallback
    // }
  }

  currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  getWeatherDetails(name: string) {
    if (!name) return;

    this.weatherServices.getWeahterApiData(name).subscribe(res => {
      this.weather.set(res);
    });
  }

  getCurrentLocationWeather() {
    if (!navigator.geolocation) {
      console.log('Geolocation not supported');
      this.getWeatherDetails('Lahore'); // optional fallback
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.weatherServices
          .getWeatherByCoords(lat, lon)
          .subscribe(res => {
            this.weather.set(res);
          });
      },

      // ✅ 👉 WRITE IT HERE
      (error) => {
        console.log('Denied, loading default city...');
        this.getWeatherDetails('Lahore'); // fallback
      }
    );
  }

}
