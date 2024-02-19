import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Centre } from 'src/app/Models/Centre';

@Injectable({
  providedIn: 'root'
})
export class CentreService {

  private apiUrl = 'http://localhost:8083/centres';

  constructor(private http: HttpClient) { }

  getCentres(): Observable<Centre[]> {
    return this.http.get<Centre[]>(this.apiUrl + '/get');
  }

  getCentreById(centreId: number): Observable<Centre> {
    return this.http.get<Centre>(this.apiUrl + '/get/' + centreId);
  }

  addCentre(centre: Centre): Observable<Centre> {
    return this.http.post<Centre>(this.apiUrl + '/create', centre);
  }
}
