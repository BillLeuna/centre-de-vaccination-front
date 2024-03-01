import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adresse } from 'src/app/Models/Adresse';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  private apiUrl = 'http://localhost:8083/adresses';

  constructor(private http: HttpClient) { }

  getAllAdresses(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(`${this.apiUrl}/get`);
  }

  getAdresseById(adresseId: number): Observable<Adresse> {
    return this.http.get<Adresse>(`${this.apiUrl}/get/${adresseId}`);
  }

  createAdresse(adresse: Adresse): Observable<Adresse> {
    return this.http.post<Adresse>(`${this.apiUrl}/create`, adresse);
  }

  updateAdresse(adresse: Adresse): Observable<Adresse> {
    return this.http.put<Adresse>(`${this.apiUrl}/update`, adresse);
  }

  deleteAdresse(adresseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${adresseId}`);
  }
}
