import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
type Api = {
  key: string,
  base: string
}

export interface WeatherResponse {
  name: string,
  main: {
    temp: number,
    pressure: number,
    humidity: number,
  },
  weather: {
    main: string,
    description: string,
  }[],
  wind: {
    speed: number,
  }
  
}

@Injectable({
  providedIn: 'root'
})

// @Component({
//   selector: 'app-weather-services',
//   imports: [],
//   templateUrl: './weather-services.html',
//   styleUrl: './weather-services.css',
// })

export class WeatherServices {

  private api:Api = {
    key: "d2b18a2382d27f783cbb15d493df59e3",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  constructor(private http: HttpClient){};

  getWeahterApiData(name: string){
    return this.http.get<WeatherResponse>(`${this.api.base}weather?q=${name}&units=metric&APPID=${this.api.key}`)
  }

  getWeatherByCoords(lat: number, lon: number) {
  return this.http.get<WeatherResponse>(
    `${this.api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${this.api.key}`
  );
}
}